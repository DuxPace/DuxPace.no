import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis.fromEnv() throws when the Upstash env vars are missing, which would
// crash any module that imports this. Build the client only when both vars are
// present and otherwise export null, so callers fail open (no rate limiting in
// local dev or an unconfigured deploy) instead of the whole route crashing.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

// Contact form: 3 requests per hour per IP. Null when Redis is unconfigured.
export const contactFormRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: true,
      prefix: "@upstash/ratelimit/contact",
    })
  : null;

// General API: 10 requests per minute per IP. Null when Redis is unconfigured.
export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/api",
    })
  : null;
