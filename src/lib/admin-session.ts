import { createHmac, timingSafeEqual } from "node:crypto";

// A single shared password for the dispatch office (ADMIN_PASSWORD on Vercel). A successful login
// sets a signed, httpOnly cookie that expires on its own; nothing is stored server-side.
// ADMIN_SESSION_SECRET signs it; rotating either variable logs everyone out.
export const ADMIN_COOKIE = "demal_admin";
export const ADMIN_SESSION_DAYS = 14;

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set (32+ chars)");
  return value;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare digests so the length of the real password does not leak through timing.
  const digest = (value: string) => createHmac("sha256", secret()).update(value).digest("hex");
  return safeEqual(digest(input), digest(expected));
}

export function createSessionToken(now = Date.now()) {
  const expires = String(now + ADMIN_SESSION_DAYS * 24 * 60 * 60 * 1000);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionToken(token: string | undefined, now = Date.now()) {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < now) return false;
  try {
    return safeEqual(signature, sign(expires));
  } catch {
    return false;
  }
}
