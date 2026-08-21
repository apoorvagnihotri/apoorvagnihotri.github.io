interface D1Result<T = unknown> {
  success: boolean;
  results?: T[];
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface Env {
  VISITS_DB: D1Database;
}

interface PagesContext {
  request: Request;
  env: Env;
}

type CounterRow = { visits: number };

const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: responseHeaders });

export const onRequestGet = async ({ env }: PagesContext) => {
  try {
    const row = await env.VISITS_DB.prepare(
      "SELECT count AS visits FROM site_counter WHERE counter_key = ?",
    )
      .bind("site-visits")
      .first<CounterRow>();

    return json({ visits: Number(row?.visits ?? 0) });
  } catch {
    return json({ error: "Visit counter unavailable" }, 503);
  }
};

export const onRequestPost = async ({ request, env }: PagesContext) => {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("Origin");

  if (origin !== requestUrl.origin) {
    return json({ error: "Cross-origin requests are not allowed" }, 403);
  }

  try {
    const row = await env.VISITS_DB.prepare(
      `INSERT INTO site_counter (counter_key, count)
       VALUES (?, 1)
       ON CONFLICT(counter_key) DO UPDATE SET
         count = count + 1,
         updated_at = CURRENT_TIMESTAMP
       RETURNING count AS visits`,
    )
      .bind("site-visits")
      .first<CounterRow>();

    return json({ visits: Number(row?.visits ?? 1) });
  } catch {
    return json({ error: "Visit counter unavailable" }, 503);
  }
};

export const onRequest = () =>
  json({ error: "Method not allowed" }, 405);
