"use client";

import { AlertTriangle, RefreshCw, Database } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDbError =
    error.message.includes("Can't reach database") ||
    error.message.includes("connect ECONNREFUSED") ||
    error.message.includes("P1001") ||
    error.message.includes("DATABASE_URL");

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="bg-white rounded-2xl border border-red-100 shadow-xl p-8 max-w-lg w-full text-center space-y-5">
        <div className="flex justify-center">
          <div className={`p-4 rounded-2xl ${isDbError ? "bg-amber-50" : "bg-red-50"}`}>
            {isDbError
              ? <Database size={32} className="text-amber-500" />
              : <AlertTriangle size={32} className="text-red-500" />}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {isDbError ? "Database Not Connected" : "Something went wrong"}
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            {isDbError
              ? "The app can't reach the database. Follow the steps below to connect."
              : error.message}
          </p>
        </div>

        {isDbError && (
          <ol className="text-left text-sm text-slate-600 space-y-2.5 bg-slate-50 rounded-xl p-4 border border-slate-200">
            {[
              <>Go to <a href="https://neon.tech" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">neon.tech</a> and create a free project</>,
              <>Copy the connection string (starts with <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">postgresql://</code>)</>,
              <>Paste it as <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">DATABASE_URL</code> in your <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">.env</code> file</>,
              <>Run <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">npm run db:push</code> in your terminal</>,
              <>Restart the dev server</>,
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}

        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <RefreshCw size={15} /> Try Again
        </button>
      </div>
    </div>
  );
}
