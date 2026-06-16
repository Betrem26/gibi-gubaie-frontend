"use client";

import { MemberWithStats } from "@/types";
import { Department, GibiRole } from "@/types/index";
import { Pencil } from "lucide-react";

const DEPT_LABELS: Record<Department, string> = {
  EDUCATION: "Education",
  CHOIR: "Choir",
  FINANCE: "Finance",
  PUBLIC_RELATIONS: "Public Relations",
  RESEARCH: "Research",
  CHARITY: "Charity",
  SUNDAY_SCHOOL: "Sunday School",
  MAHIBER: "Mahiber",
};

const DEPT_STYLES: Record<Department, string> = {
  EDUCATION:        "bg-sky-100 text-sky-700 border-sky-200",
  CHOIR:            "bg-purple-100 text-purple-700 border-purple-200",
  FINANCE:          "bg-emerald-100 text-emerald-700 border-emerald-200",
  PUBLIC_RELATIONS: "bg-amber-100 text-amber-700 border-amber-200",
  RESEARCH:         "bg-rose-100 text-rose-700 border-rose-200",
  CHARITY:          "bg-pink-100 text-pink-700 border-pink-200",
  SUNDAY_SCHOOL:    "bg-indigo-100 text-indigo-700 border-indigo-200",
  MAHIBER:          "bg-teal-100 text-teal-700 border-teal-200",
};

const ROLE_STYLES: Record<GibiRole, string> = {
  ADMIN:           "bg-red-100 text-red-700 border-red-200",
  DEPARTMENT_HEAD: "bg-violet-100 text-violet-700 border-violet-200",
  SECRETARY:       "bg-blue-100 text-blue-700 border-blue-200",
  TREASURER:       "bg-green-100 text-green-700 border-green-200",
  MEMBER:          "bg-slate-100 text-slate-600 border-slate-200",
};

const ROLE_LABELS: Record<GibiRole, string> = {
  ADMIN: "Admin",
  DEPARTMENT_HEAD: "Dept. Head",
  SECRETARY: "Secretary",
  TREASURER: "Treasurer",
  MEMBER: "Member",
};

function StatusBadge({ active }: { active: boolean }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-700 border border-yellow-200 text-xs font-semibold px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
      Pending
    </span>
  );
}

export default function MembersTable({ members }: { members: MemberWithStats[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Member</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Univ. ID</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Department</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Batch</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {members.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <Pencil size={18} className="text-slate-300" />
                    </div>
                    <p className="font-medium text-slate-500">No members yet</p>
                    <p className="text-xs">Click &quot;Add Member&quot; to get started</p>
                  </div>
                </td>
              </tr>
            )}
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                {/* Member */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 leading-tight">{m.name}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{m.email}</p>
                    </div>
                  </div>
                </td>
                {/* Univ ID */}
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {m.universityId}
                  </span>
                </td>
                {/* Department */}
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${DEPT_STYLES[m.department]}`}>
                    {DEPT_LABELS[m.department]}
                  </span>
                </td>
                {/* Batch */}
                <td className="px-5 py-3.5 text-slate-500 text-xs hidden lg:table-cell">{m.batch}</td>
                {/* Role */}
                <td className="px-5 py-3.5">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_STYLES[m.role]}`}>
                    {ROLE_LABELS[m.role]}
                  </span>
                </td>
                {/* Status badge */}
                <td className="px-5 py-3.5">
                  <StatusBadge active={m.isActive} />
                </td>
                {/* Edit */}
                <td className="px-5 py-3.5">
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      {members.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">
            Showing <span className="font-semibold text-slate-600">{members.length}</span> members ·{" "}
            <span className="text-green-600 font-semibold">{members.filter((m) => m.isActive).length} active</span>
            {" · "}
            <span className="text-yellow-600 font-semibold">{members.filter((m) => !m.isActive).length} pending</span>
          </p>
        </div>
      )}
    </div>
  );
}
