import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 12;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
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
