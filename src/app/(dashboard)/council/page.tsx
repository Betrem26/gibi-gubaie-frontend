import type { Metadata } from "next";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { apiFetch } from "@/lib/api";
import { ALL_SECTIONS } from "@/lib/council";
import { CouncilSection } from "@/types/index";
import { Users, ChevronRight, Building2, ShieldCheck } from "lucide-react";

export const dynamic  = "force-dynamic";
export const metadata: Metadata = { title: "Campus Council" };

export default async function CouncilPage() {
  const { userId } = await auth();
  const clerkUser  = userId ? await currentUser() : null;
  const viewerMeta = clerkUser?.publicMetadata as { councilSection?: CouncilSection; councilRole?: string; councilMemberId?: string } | undefined;
  const viewerSection = viewerMeta?.councilSection ?? null;
  const viewerRole    = viewerMeta?.councilRole    ?? "MEMBER";
  const isMainOfficer = viewerSection === "MAIN_OFFICE";

  const members = await apiFetch<{ section: CouncilSection; isActive: boolean; role: string }[]>("/api/council").catch(() => []);

  const countMap: Partial<Record<CouncilSection, number>> = {};
  for (const m of members) {
    if (m.isActive) countMap[m.section] = (countMap[m.section] ?? 0) + 1;
  }
  const totalActive  = Object.values(countMap).reduce((a, b) => a + b, 0);
  const sectionHeads = members.filter((m) => m.role === "SECTION_HEAD" && m.isActive).length;
  const coordinators = members.filter((m) => m.role === "COORDINATOR"  && m.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={20} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Campus Council</h1>
          </div>
          <p className="text-slate-500 text-sm">
            ጊቢ ጉባኤ ምክር ቤት · {ALL_SECTIONS.length} sections ·{" "}
            <span className="text-emerald-600 font-semibold">{totalActive} active members</span>
          </p>
        </div>
        {viewerSection && (
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <ShieldCheck size={14} className={isMainOfficer ? "text-blue-600" : "text-emerald-600"} />
            <div>
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {isMainOfficer ? "Main Office — Full Access" : (ALL_SECTIONS.find((s) => s.key === viewerSection)?.label ?? viewerSection)}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight capitalize">{String(viewerRole).replace(/_/g, " ").toLowerCase()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Sections",  value: ALL_SECTIONS.length, color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
          { label: "Active Members",  value: totalActive,          color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          { label: "Section Heads",   value: sectionHeads,         color: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100" },
          { label: "Coordinators",    value: coordinators,         color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} p-4 text-center`}>
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-0.5">
          {isMainOfficer ? "All Sections — Click to manage" : "Sections — Click to view"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {ALL_SECTIONS.map((section) => {
            const Icon      = section.icon;
            const count     = countMap[section.key] ?? 0;
            const isMain    = section.key === "MAIN_OFFICE";
            const isOwn     = viewerSection === section.key;
            const canManage = isMainOfficer || (isOwn && (viewerRole === "SECTION_HEAD" || viewerRole === "DEPUTY_HEAD"));
            return (
              <Link key={section.key} href={section.href}
                className={`group relative bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isMain ? "border-blue-200 ring-1 ring-blue-100" : isOwn ? `${section.borderColor} ring-1 ring-offset-1` : "border-slate-200 hover:border-slate-300"}`}>
                <div className={`h-1.5 w-full ${section.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-11 h-11 rounded-xl ${section.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={section.textColor} />
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {canManage && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${isMainOfficer ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {isMainOfficer ? "Manage" : "Your section"}
                        </span>
                      )}
                      <ChevronRight size={15} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all mt-0.5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-slate-900 text-base leading-tight">{section.label}</h2>
                      {isMain && <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">HQ</span>}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{section.amharic}</p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{section.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-slate-400" />
                      <span className="text-xs text-slate-500"><span className="font-semibold text-slate-700">{count}</span> active</span>
                    </div>
                    {isOwn && (
                      <span className={`text-[10px] font-semibold ${section.textColor} flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${section.color}`} /> Your section
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
