import { createHash, randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 12;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_CLEANUP_MINUTES = 60;

const BLOCKED_NAME_PATTERNS = [
  /^RL_\d+$/i,
  /^CORStest$/i,
  /^SecTest$/i,
  /^anonymous$/i,
  /^ann?onymous$/i,
];

const BLOCKED_TEXT_PATTERNS = [
  /^Rate limit test \d+$/i,
  /^CORS test$/i,
  /^test$/i,
];

const UNSAFE_MARKUP_PATTERN =
  /<\s*\/?\s*[a-z!]|on[a-z]+\s*=|javascript\s*:|data\s*:/i;
const UNSAFE_SQL_PATTERN =
  /(--|;\s*(drop|delete|insert|update|alter|truncate)\b|\bunion\s+select\b|\bexists\s*\(\s*select\b|\bsleep\s*\(|\b(or|and)\b\s+['"`]?\w+['"`]?\s*=\s*['"`]?\w+['"`]?|^'+$)/i;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function cleanText(value, maxLength) {
  return String(value || "")
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code <= 31 || code === 127 ? " " : char;
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function parsePageValue(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function getSql() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  return neon(process.env.DATABASE_URL);
}

async function ensureSchema(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS guest_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS guest_message_rate_limits (
      client_key TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS guest_message_rate_limits_client_created_idx
    ON guest_message_rate_limits (client_key, created_at DESC)
  `;
}

async function deleteKnownSpam(sql) {
  await sql`
    DELETE FROM guest_messages
    WHERE
      name ~* '^RL_[0-9]+$'
      OR name ~* '^CORStest$'
      OR name ~* '^SecTest$'
      OR name ~* '^ann?onymous$'
      OR message ~* '^Rate limit test [0-9]+$'
      OR message ~* '^CORS test$'
      OR message ~* '<[[:space:]]*/?[[:space:]]*[[:alpha:]!]+'
      OR message ~* 'javascript[[:space:]]*:'
      OR (name || ' ' || message) LIKE '%--%'
      OR (name || ' ' || message) ~* ';[[:space:]]*(drop|delete|insert|update|alter|truncate)[[:space:]]+'
      OR (name || ' ' || message) ~* 'union[[:space:]]+select'
      OR (name || ' ' || message) ~* 'exists[[:space:]]*\([[:space:]]*select'
      OR (name || ' ' || message) ~* 'sleep[[:space:]]*\('
      OR (name || ' ' || message) ~* '[[:space:]](or|and)[[:space:]][^[:cntrl:]]*='
      OR trim(name) IN ('''', '''''')
      OR trim(message) IN ('''', '''''')
  `;
}

function getRequestHost(req) {
  const forwardedHost = String(req.headers["x-forwarded-host"] || "").split(",")[0].trim();
  return forwardedHost || req.headers.host || "";
}

function isSameOriginPost(req) {
  const requestHost = getRequestHost(req);
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const source = origin || referer;

  if (!requestHost || !source) {
    return false;
  }

  try {
    const sourceHost = new URL(source).host;
    return sourceHost === requestHost;
  } catch {
    return false;
  }
}

function isBlockedContent(name, text) {
  return (
    UNSAFE_MARKUP_PATTERN.test(name) ||
    UNSAFE_MARKUP_PATTERN.test(text) ||
    UNSAFE_SQL_PATTERN.test(name) ||
    UNSAFE_SQL_PATTERN.test(text) ||
    BLOCKED_NAME_PATTERNS.some((pattern) => pattern.test(name)) ||
    BLOCKED_TEXT_PATTERNS.some((pattern) => pattern.test(text))
  );
}

function getClientKey(req) {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  const ip = forwardedFor || req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
  const userAgent = req.headers["user-agent"] || "unknown";
  const salt = process.env.MESSAGE_RATE_LIMIT_SALT || "engagement-guestbook";

  return createHash("sha256").update(`${salt}:${ip}:${userAgent}`).digest("hex");
}

async function assertRateLimit(req, res, sql) {
  const clientKey = getClientKey(req);

  await sql`
    DELETE FROM guest_message_rate_limits
    WHERE created_at < NOW() - (${RATE_LIMIT_CLEANUP_MINUTES} * INTERVAL '1 minute')
  `;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM guest_message_rate_limits
    WHERE
      client_key = ${clientKey}
      AND created_at > NOW() - (${RATE_LIMIT_WINDOW_MINUTES} * INTERVAL '1 minute')
  `;

  if (Number(rows[0]?.count || 0) >= RATE_LIMIT_MAX) {
    json(res, 429, { error: "Too many messages. Please try again later." });
    return false;
  }

  await sql`
    INSERT INTO guest_message_rate_limits (client_key)
    VALUES (${clientKey})
  `;

  return true;
}

async function listMessages(req, res, sql) {
  const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
  const limit = Math.min(parsePageValue(url.searchParams.get("limit"), DEFAULT_LIMIT), MAX_LIMIT);
  const offset = parsePageValue(url.searchParams.get("offset"), 0);

  const rows = await sql`
    SELECT id, name, message AS text, created_at AS "createdAt"
    FROM guest_messages
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  const totals = await sql`SELECT COUNT(*)::int AS count FROM guest_messages`;

  json(res, 200, {
    messages: rows,
    total: Number(totals[0]?.count || 0),
    databaseConfigured: true,
  });
}

async function createMessage(req, res, sql) {
  if (!isSameOriginPost(req)) {
    json(res, 403, { error: "Message submissions must come from this website." });
    return;
  }

  let payload;

  try {
    if (typeof req.body === "string") {
      payload = JSON.parse(req.body);
    } else if (req.body && typeof req.body === "object") {
      payload = req.body;
    } else {
      payload = JSON.parse(await readBody(req));
    }
  } catch {
    json(res, 400, { error: "Invalid JSON body." });
    return;
  }

  const name = cleanText(payload.name, 60);
  const text = cleanText(payload.text, 500);

  if (!name || !text) {
    json(res, 400, { error: "Name and message are required." });
    return;
  }

  if (isBlockedContent(name, text)) {
    json(res, 400, { error: "Please use a real name and message without test text, HTML, or SQL." });
    return;
  }

  const allowed = await assertRateLimit(req, res, sql);
  if (!allowed) {
    return;
  }

  const id = randomUUID();
  const rows = await sql`
    INSERT INTO guest_messages (id, name, message)
    VALUES (${id}, ${name}, ${text})
    RETURNING id, name, message AS text, created_at AS "createdAt"
  `;

  json(res, 201, { message: rows[0], databaseConfigured: true });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 32) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    json(res, 405, { error: "Method not allowed." });
    return;
  }

  const sql = getSql();

  if (!sql) {
    json(res, 503, {
      error: "DATABASE_URL is not configured.",
      code: "DATABASE_NOT_CONFIGURED",
      databaseConfigured: false,
    });
    return;
  }

  try {
    await ensureSchema(sql);
    await deleteKnownSpam(sql);

    if (req.method === "GET") {
      await listMessages(req, res, sql);
      return;
    }

    await createMessage(req, res, sql);
  } catch (error) {
    console.error("Guest messages API error:", error);
    json(res, 500, { error: "Unable to process guest messages." });
  }
}
