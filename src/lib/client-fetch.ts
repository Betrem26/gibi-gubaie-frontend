"use client";

/**
 * clientFetch — client-side fetch wrapper that automatically attaches
 * the Clerk session token as a Bearer header.
 *
 * Use this instead of raw fetch() in client components that call
 * protected API routes (POST, PATCH, DELETE).
 */
import { useAuth } from "@clerk/nextjs";

// Hook version — use inside React components
export function useApiFetch() {
  const { getToken } = useAuth();

  return async function apiFetch<T>(
    path: string,
    init?: RequestInit
  ): Promise<T> {
    const token = await getToken();
    const res = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(init?.headers ?? {}),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        (err as { error?: string }).error ?? `API error ${res.status}`
      );
    }

    return res.json() as Promise<T>;
  };
}
