/**
 * api.ts — server-side fetch helper for Next.js server components.
 *
 * For server-side requests (Server Components / Route Handlers) we call the
 * backend directly using API_URL (never exposed to the browser).
 *
 * For client-side requests, the next.config.ts rewrites proxy /api/* and
 * /auth/* to the backend, so relative fetch("/api/...") calls just work.
 */

import { auth } from "@clerk/nextjs/server";

const BASE = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

/**
 * Server-side authenticated fetch.
 * Automatically attaches the Clerk Bearer token for protected routes.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  // Attempt to get the Clerk session token for server-side requests.
  // This is a no-op when called outside a request context (e.g. build time).
  let authHeader: Record<string, string> = {};
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (token) {
      authHeader = { Authorization: `Bearer ${token}` };
    }
  } catch {
    // Not in a Clerk request context — proceed without auth header
  }

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `API error ${res.status}`);
  }

  return res.json() as Promise<T>;
}
