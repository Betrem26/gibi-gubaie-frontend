"use client";

import { useState } from "react";
import { Search, UserCheck, UserX } from "lucide-react";
import { CouncilMemberRow } from "@/types/index";

interface MemberCarePageProps {
  members: CouncilMemberRow[];
  canManage: boolean;
}

export default function MemberCarePage({ members, canManage }: MemberCarePageProps) {
  const [search, setSearch] = useState("");

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    return (
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.universityId.toLowerCase().includes(q)
    );
  });

  const active  = filtered.filter((m) => m.isActive);
  const pending = filtered.filter((m) => !m.isActive);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search members by name, email or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Active members */}
      {active.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <UserCheck size={13} className="text-emerald-500" /> Active · {active.length}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {active.map((m) => (
              <MemberRow key={m.id} member={m} canManage={canManage} />
            ))}
          </div>
        </section>
      )}

      {/* Pending / inactive members */}
      {pending.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center gap-1.5">
            <UserX size={13} className="text-amber-500" /> Pending / Inactive · {pending.length}
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {pending.map((m) => (
              <MemberRow key={m.id} member={m} canManage={canManage} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Search size={28} className="mx-auto mb-2 text-slate-200" />
          <p className="font-medium text-slate-500">No members found</p>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}

function MemberRow({
  member,
  canManage,
}: {
  member: CouncilMemberRow;
  canManage: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/70 transition-colors">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
        {member.name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 text-sm leading-tight truncate">{member.name}</p>
        <p className="text-slate-400 text-xs truncate">{member.email}</p>
      </div>

      {/* University ID */}
      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded hidden md:inline-block">
        {member.universityId}
      </span>

      {/* Batch */}
      <span className="text-xs text-slate-400 hidden lg:inline-block">{member.batch}</span>

      {/* Role badge */}
      <span className="text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full">
        {member.role.replace(/_/g, " ")}
      </span>

      {/* Status */}
      {member.isActive ? (
        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
        </span>
      )}
    </div>
  );
}
