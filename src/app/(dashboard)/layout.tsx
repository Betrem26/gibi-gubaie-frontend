import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import TopBarProfile from "@/components/topbar-profile";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-4">
          {/* Mobile hamburger spacer */}
          <div className="lg:hidden w-8 shrink-0" />

          {/* Left — system name */}
          <div className="hidden lg:flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-slate-500 truncate">
              Gibi Gubaie · Ethiopian Orthodox Tewahedo Student Association
            </span>
          </div>

          {/* Right — user profile (client component) */}
          <TopBarProfile />
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-7 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-slate-200 bg-white/50">
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} Gibi Gubaie · Ethiopian Orthodox Tewahedo University Student Association
          </p>
        </footer>
      </div>
    </div>
  );
}
