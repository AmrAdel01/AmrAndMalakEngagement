import test from "node:test";
import assert from "node:assert/strict";
import {
  cleanGuestMessageText,
  isBlockedGuestMessageContent,
} from "../src/utils/guestMessageModeration.js";

test("allows real congratulation messages", () => {
  const allowedMessages = [
    {
      name: "YASSO",
      text: "الف مبروك يا اخوياا وربنا يتمملك علي خير",
    },
    {
      name: "Ghandy",
      text: "ألف ألف مبروك يا دولا، ربنا يسعدكم مع بعض ويكتبلكم الخير",
    },
    {
      name: "Joe",
      text: "3amoooor alf alf mabrook ya habeb alby",
    },
    {
      name: "Youssef Megahed",
      text: "الف مليون مبروك يا حته مني وديما شايفك في نجاح",
    },
  ];

  for (const message of allowedMessages) {
    assert.equal(isBlockedGuestMessageContent(message.name, message.text), false);
  }
});

test("blocks XSS and SQL injection probes", () => {
  const blockedMessages = [
    { name: "<script>alert(1)</script>", text: "test" },
    { name: "'", text: "' OR 'x'='x" },
    { name: "A", text: "admin'--" },
    { name: "'", text: "' OR EXISTS(SELECT * FROM users)--" },
    { name: "'", text: "' AND 1=SLEEP(5)--" },
    { name: "'", text: "'; DROP TABLE messages; --" },
    { name: "1", text: "1' UNION SELECT NULL--" },
    { name: "'", text: "' OR 1=1--" },
    { name: "'", text: "' OR '1'='1" },
    { name: "'", text: "''" },
    { name: "RL_19", text: "Rate limit test 19" },
    { name: "CORStest", text: "CORS test" },
  ];

  for (const message of blockedMessages) {
    assert.equal(isBlockedGuestMessageContent(message.name, message.text), true);
  }
});

test("normalizes control characters without changing normal words", () => {
  assert.equal(cleanGuestMessageText("  hello\u0000   world  ", 20), "hello world");
  assert.equal(cleanGuestMessageText("abcdef", 3), "abc");
});
