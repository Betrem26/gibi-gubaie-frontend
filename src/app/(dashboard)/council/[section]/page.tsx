import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { apiFetch } from "@/lib/api";
import { SLUG_TO_SECTION, SECTION_META } from "@/lib/council";
import CouncilSectionClient, { SerializableSectionMeta } from "@/components/council-section-client";
import MemberCarePage from "./members-care-page";
import { ChevronRight, Building2, ShieldAlert, UserCheck } from "lucide-react";
import { CouncilSection, CouncilMemberRow } from "@/types/index";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: slug } = await params;
  const sectionKey = SLUG_TO_SECTION[slug];
  if (!sectionKey) return { title: "Not Found" };
  return { title: SECTION_META[sectionKey].label + " · Council" };
}

export default async function CouncilSectionPage({ params }: Props) {
  const { section: slug } = await params;
  const sectionKey = SLUG_TO_SECTION[slug];
  if (!sectionKey) notFound();

  const meta = SECTION_META[sectionKey];

  // Viewer identity from Clerk metadata
  const { userId } = await auth();
  const clerkUser   = userId ? await currentUser() : null;
  const viewerMeta  = clerkUser?.publicMetadata as { councilSection?: CouncilSection; councilRole?: string } | undefined;
  const viewerSection = viewerMeta?.councilSection ?? null;
  const viewerRole    = viewerMeta?.councilRole    ?? "MEMBER";

  const isMainOffice = sectionKey === "MAIN_OFFICE";
  const canManage =
    viewerSection === "MAIN_OFFICE" ||
    (viewerSection === sectionKey && viewerRole === "SECTION_HEAD") ||
    (viewerSection === sectionKey && viewerRole === "DEPUTY_HEAD");

  // Fetch members from backend
  const allMembers = await apiFetch<CouncilMemberRow[]>(
    isMainOffice ? "/api/council" : `/api/council?section=${sectionKey}`
  ).catch(() => [] as CouncilMemberRow[]);

  // ── አባላት እንክብካቤ (RESEARCH) — special member-care page ──────────────────
  if (sectionKey === "RESEARCH") {
    const nonResearch = allMembers.filter((m) => m.section !== "RESEARCH");
    const totalActive = nonResearch.filter((m) => m.isActive).length;

    return (
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/council" className="hover:text-slate-600 transition-colors flex items-center gap-1">
            <Building2 size={12} /> Council
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 font-medium">አባላት እንክብካቤ</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0">
              <UserCheck size={22} className="text-rose-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-900">አባላት እንክብካቤ</h1>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Member Care</span>
                {canManage && (
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    {viewerSection === "MAIN_OFFICE" ? "Full Access" : viewerRole === "SECTION_HEAD" ? "Section Head" : "Deputy Head"}
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm mt-0.5">አባላት እንክብካቤ ክፍል</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">
              {nonResearch.length} total · <span className="text-emerald-600 font-semibold">{totalActive} active</span>
            </p>
          </div>
        </div>

        {!canManage && viewerSection && viewerSection !== sectionKey && (
          <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
            <ShieldAlert size={15} className="shrink-0" />
            <span>You are viewing <strong>አባላት እንክብካቤ</strong> in read-only mode.</span>
          </div>
        )}

        <MemberCarePage members={nonResearch} canManage={canManage} />
      </div>
    );
  }

  // ── Regular section page ───────────────────────────────────────────────────
  const members = isMainOffice
    ? allMembers
    : allMembers.filter((m) => m.section === sectionKey);

  const active  = members.filter((m) => m.isActive).length;
  const pending = members.length - active;
  const Icon    = meta.icon;

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/council" className="hover:text-slate-600 transition-colors flex items-center gap-1">
          <Building2 size={12} /> Council
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-600 font-medium">{meta.label}</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl ${meta.bgColor} flex items-center justify-center shrink-0`}>
            <Icon size={22} className={meta.textColor} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900">{meta.label}</h1>
              {isMainOffice && <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">HQ · All Sections</span>}
              {canManage && !isMainOffice && (
                <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  {viewerRole === "SECTION_HEAD" ? "Section Head" : "Deputy Head"}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-0.5">{meta.amharic}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">
            {members.length} member{members.length !== 1 ? "s" : ""} · <span className="text-emerald-600 font-semibold">{active} active</span>
            {pending > 0 && <> · <span className="text-amber-600 font-semibold">{pending} pending</span></>}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{isMainOffice ? "Showing all sections" : meta.description}</p>
        </div>
      </div>

      {!canManage && viewerSection && viewerSection !== sectionKey && !isMainOffice && (
        <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          <ShieldAlert size={15} className="shrink-0" />
          <span>You are viewing <strong>{meta.label}</strong> in read-only mode.</span>
        </div>
      )}

      <CouncilSectionClient
        members={members}
        section={sectionKey}
        isMainOffice={isMainOffice}
        canManage={canManage}
        meta={{ label: meta.label, bgColor: meta.bgColor, textColor: meta.textColor, borderColor: meta.borderColor } satisfies SerializableSectionMeta}
      />
    </div>
  );
}
