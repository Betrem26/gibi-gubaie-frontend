"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, CalendarCheck, Wallet,
  BookOpen, Music, DollarSign, Megaphone, FlaskConical,
  Heart, Menu, X, ChevronRight, Bell, HandHeart, ClipboardList,
  Cross, Church, Flame, Users2, Building2, CalendarClock,
} from "lucide-react";
import { useState } from "react";

const mainNav = [
  { href: "/",              label: "Dashboard",     icon: LayoutDashboard },
  { href: "/members",       label: "Members",       icon: Users },
  { href: "/attendance",    label: "Attendance",    icon: CalendarCheck },
  { href: "/finance",       label: "Finance",       icon: Wallet },
  { href: "/events",        label: "Events",        icon: Church },
  { href: "/prayer",        label: "Prayer Board",  icon: Cross },
  { href: "/tasks",         label: "Tasks",         icon: ClipboardList },
  { href: "/announcements", label: "Announcements", icon: Bell },
  { href: "/kidase",        label: "Kidase",        icon: Church },
  { href: "/fasting",       label: "Fasting",       icon: Flame },
  { href: "/mahiber",       label: "Mahiber",       icon: Users2 },
];

const councilNav = [
  { href: "/council",                    label: "Overview",          amharic: "ምክር ቤት",             icon: Building2,     color: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50" },
  { href: "/council/main-office",        label: "Main Office",       amharic: "ዋና ጽ/ቤት",            icon: Building2,     color: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50" },
  { href: "/council/education",          label: "Education",         amharic: "ትምህርት ክፍል",          icon: BookOpen,      color: "bg-sky-500",     text: "text-sky-700",     bg: "bg-sky-50" },
  { href: "/council/choir",              label: "Choir & Fine Arts", amharic: "ዘማሪ እና ኪነ ጥበብ",     icon: Music,         color: "bg-purple-500",  text: "text-purple-700",  bg: "bg-purple-50" },
  { href: "/council/finance",            label: "Development",       amharic: "ልማት ክፍል",            icon: DollarSign,    color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  { href: "/council/public-relations",   label: "Public Relations",  amharic: "ህዝብ ግንኙነት ክፍል",     icon: Megaphone,     color: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50" },
  { href: "/council/research",           label: "አባላት እንክብካቤ",    amharic: "አባላት እንክብካቤ ክፍል",    icon: FlaskConical,  color: "bg-rose-500",    text: "text-rose-700",    bg: "bg-rose-50" },
  { href: "/council/charity",            label: "Charity",           amharic: "ምጽዋት ክፍል",           icon: Heart,         color: "bg-pink-500",    text: "text-pink-700",    bg: "bg-pink-50" },
  { href: "/council/batch-coordination", label: "Batch & Coord.",    amharic: "ባች እና ማስተባበሪያ ክፍል",  icon: CalendarClock, color: "bg-indigo-500",  text: "text-indigo-700",  bg: "bg-indigo-50" },
];

const departments = [
  { label: "Education",      amharic: "ትምህርት",     icon: BookOpen,     color: "bg-sky-500",     text: "text-sky-700",     bg: "bg-sky-50" },
  { label: "Choir (Zemari)", amharic: "ዘማሪ",       icon: Music,        color: "bg-purple-500",  text: "text-purple-700",  bg: "bg-purple-50" },
  { label: "Finance",        amharic: "ፋይናንስ",     icon: DollarSign,   color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Public Rel.",    amharic: "ህዝብ ግንኙነት", icon: Megaphone,    color: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50" },
  { label: "Research",       amharic: "ምርምር",       icon: FlaskConical, color: "bg-rose-500",    text: "text-rose-700",    bg: "bg-rose-50" },
  { label: "Charity",        amharic: "ምጽዋት",      icon: Heart,        color: "bg-pink-500",    text: "text-pink-700",    bg: "bg-pink-50" },
  { label: "Sunday School",  amharic: "ሰ/ት/ቤት",    icon: BookOpen,     color: "bg-indigo-500",  text: "text-indigo-700",  bg: "bg-indigo-50" },
  { label: "Mahiber",        amharic: "ማህበር",       icon: HandHeart,    color: "bg-teal-500",    text: "text-teal-700",    bg: "bg-teal-50" },
];

// ── Extracted as a proper top-level component — fixes React hydration #418 ───
// (never define components inside other components)
function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-full w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <span className="text-white font-black text-sm tracking-tighter">GG</span>
          </div>
          <div className="min-w-0">
            <p className="text-slate-900 font-bold text-sm leading-tight">Gibi Gubaie</p>
            <p className="text-slate-400 text-[10px] mt-0.5 leading-tight">ጊቢ ጉባኤ · EOTC Students</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto scrollbar-thin space-y-4">

        {/* Main links */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5">Main</p>
          <ul className="space-y-0.5">
            {mainNav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-white" : "text-slate-400"} />
                    <span className="flex-1">{label}</span>
                    {active && <ChevronRight size={13} className="text-white/60" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Departments */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5">Departments</p>
          <ul className="space-y-0.5">
            {departments.map(({ label, amharic, icon: Icon, color, text, bg }) => (
              <li key={label}>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                  <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={12} className={text} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate">{label}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{amharic}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Campus Council */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1.5">Campus Council</p>
          <ul className="space-y-0.5">
            {councilNav.map(({ href, label, amharic, icon: Icon, text, bg }) => {
              const active = pathname === href || (href !== "/council" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-white/20" : bg}`}>
                      <Icon size={12} className={active ? "text-white" : text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-tight truncate">{label}</p>
                      <p className={`text-[10px] leading-tight ${active ? "text-white/70" : "text-slate-400"}`}>{amharic}</p>
                    </div>
                    {active && <ChevronRight size={12} className="text-white/60 shrink-0" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

      </nav>

      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          Ethiopian Orthodox Tewahedo<br />University Student Association
        </p>
      </div>
    </aside>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-3.5 left-4 z-50 p-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-600 hover:bg-slate-50 transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Desktop */}
      <div className="hidden lg:block fixed top-0 left-0 h-full z-40">
        <SidebarContent onNavigate={() => {}} />
      </div>

      {/* Mobile */}
      <div className={`lg:hidden fixed top-0 left-0 h-full z-40 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}
