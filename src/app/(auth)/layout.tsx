import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign In" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, #1e40af 0%, #0f172a 60%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      {/* Brand */}
      <div className="relative mb-8 flex flex-col items-center gap-3 select-none">
        <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl ring-1 ring-white/5">
          <span className="text-white font-black text-2xl tracking-tighter">GG</span>
        </div>
        <div className="text-center">
          <h1 className="text-white text-2xl font-bold tracking-tight">Gibi Gubaie</h1>
          <p className="text-blue-300/80 text-sm mt-0.5 font-medium">Management System</p>
        </div>
      </div>

      {/* Clerk widget */}
      <div className="relative w-full max-w-md">{children}</div>

      <p className="relative mt-8 text-white/30 text-xs text-center">
        © {new Date().getFullYear()} Gibi Gubaie · University Spiritual Association
      </p>
    </div>
  );
}
