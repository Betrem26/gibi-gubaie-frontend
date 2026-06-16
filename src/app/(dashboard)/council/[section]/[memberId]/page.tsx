import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { SLUG_TO_SECTION, SECTION_META, ROLE_LABELS, ROLE_STYLES } from "@/lib/council";
import { SECTION_SUB_SECTIONS } from "@/lib/council-data";
import { Building2, ChevronRight, Mail, Phone, GraduationCap, Calendar, User, Layers } from "lucide-react";
import CouncilMemberProfileClient, { SerializableMeta } from "@/components/council-member-profile-client";
import { CouncilMemberRow } from "@/types/index";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ section: string; memberId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { memberId } = await params;
  try {
    const member = await apiFetch<{ name: string }>(`/api/council/${memberId}`);
    return { title: member.name + " · Council" };
  } catch { return { title: "Council Member" }; }
}

export default async function CouncilMemberProfilePage({ params }: Props) {
  const { section: slug, memberId } = await params;
  const sectionKey = SLUG_TO_SECTION[slug];
  if (!sectionKey) notFound();

  const member = await apiFetch<CouncilMemberRow>(`/api/council/${memberId}`).catch(() => null);
  if (!member || member.section !== sectionKey) notFound();

  const meta     = SECTION_META[sectionKey];
  const Icon     = meta.icon;
  const initials = member.name.split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");

  return (
    <div className="space-y-5 max-w-3xl">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
        <Link href="/council" className="hover:text-slate-600 transition-colors flex items-center gap-1">
          <Building2 size={12} /> Council
        </Link>
        <ChevronRight size={12} />
        <Link href={meta.href} className="hover:text-slate-600 transition-colors">{meta.label}</Link>
        <ChevronRight size={12} />
        <span className="text-slate-600 font-medium truncate">{member.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className={`h-2 w-full ${meta.color}`} />
        <div className="p-6">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="shrink-0">
              {member.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.photoUrl} alt={member.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200" />
              ) : (
                <div className={`w-20 h-20 rounded-2xl ${meta.bgColor} flex items-center justify-center`}>
                  <span className={`text-2xl font-black ${meta.textColor}`}>{initials}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">{member.name}</h1>
                {member.isActive ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Inactive
                  </span>
                )}
              </div>
              {member.baptismalName && <p className="text-slate-400 text-sm mt-0.5">✝ {member.baptismalName}</p>}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_STYLES[member.role]}`}>{ROLE_LABELS[member.role]}</span>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.bgColor} ${meta.textColor} border ${meta.borderColor}`}>
                  <Icon size={11} /> {meta.label}
                </div>
              </div>
            </div>
            <CouncilMemberProfileClient
              member={member}
              meta={{ label: meta.label, bgColor: meta.bgColor, textColor: meta.textColor, borderColor: meta.borderColor } satisfies SerializableMeta}
            />
          </div>
          {member.bio && (
            <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</h2>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><Mail size={14} className="text-blue-600" /></div>
              <div className="min-w-0"><p className="text-xs text-slate-400">Email</p><p className="text-sm font-medium text-slate-800 truncate">{member.email}</p></div>
            </div>
            {member.phone && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0"><Phone size={14} className="text-emerald-600" /></div>
                <div><p className="text-xs text-slate-400">Phone</p><p className="text-sm font-medium text-slate-800">{member.phone}</p></div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Academic</h2>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0"><GraduationCap size={14} className="text-violet-600" /></div>
              <div><p className="text-xs text-slate-400">University ID</p><p className="text-sm font-mono font-semibold text-slate-800">{member.universityId}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0"><User size={14} className="text-amber-600" /></div>
              <div><p className="text-xs text-slate-400">Batch</p><p className="text-sm font-medium text-slate-800">{member.batch}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3 sm:col-span-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Council Info</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-400">Section</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{meta.label}</p>
              <p className="text-xs text-slate-400">{meta.amharic}</p>
            </div>
            {(() => {
              const subs = SECTION_SUB_SECTIONS[sectionKey];
              const subLabel = member.subSection && subs ? (subs.find((s) => s.key === member.subSection)?.label ?? member.subSection) : null;
              return subLabel ? (
                <div>
                  <p className="text-xs text-slate-400">Sub-section</p>
                  <div className="flex items-center gap-1 mt-0.5"><Layers size={12} className="text-slate-400" /><p className="text-sm font-semibold text-slate-800">{subLabel}</p></div>
                </div>
              ) : null;
            })()}
            <div>
              <p className="text-xs text-slate-400">Role</p>
              <p className="text-sm font-semibold text-slate-800 mt-0.5">{ROLE_LABELS[member.role]}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Joined</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar size={12} className="text-slate-400" />
                <p className="text-sm font-medium text-slate-800">
                  {new Date(member.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
