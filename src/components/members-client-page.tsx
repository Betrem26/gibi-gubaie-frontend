"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Pencil, X, Check } from "lucide-react";
import { Department, GibiRole } from "@/types/index";
import { MemberWithStats } from "@/types";

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

type DeptFilter = "ALL" | Department;

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditMemberModal({
  member,
  onClose,
}: {
  member: MemberWithStats;
  onClose: () => void;
}) {
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res  = await fetch("/api/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json.error ?? "Failed to update."); setSaving(false); return; }
      setSuccess(true);
      setSaving(false);
      setTimeout(() => { onClose(); window.location.reload(); }, 800);
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md ring-1 ring-slate-200/60">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900">Edit Member</h3>
            <p className="text-slate-400 text-xs mt-0.5">{member.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error   && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {error}</p>}
          {success && <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">✓ Updated!</p>}

          <div className="space-y-3">
            {[
              { name: "name",         label: "Full Name",     type: "text",  defaultValue: member.name },
              { name: "email",        label: "Email",         type: "email", defaultValue: member.email },
              { name: "phone",        label: "Phone",         type: "tel",   defaultValue: member.phone ?? "" },
              { name: "universityId", label: "University ID", type: "text",  defaultValue: member.universityId },
              { name: "batch",        label: "Batch",         type: "text",  defaultValue: member.batch },
            ].map(({ name, label, type, defaultValue }) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                <input
                  name={name} type={type} defaultValue={defaultValue}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
              <select name="department" defaultValue={member.department}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {Object.values(Department).map((d) => (
                  <option key={d} value={d}>{DEPT_LABELS[d]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <select name="role" defaultValue={member.role}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {Object.values(GibiRole).map((r) => (
                  <option key={r} value={r}>{r.replace("_", " ")}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
            <select name="isActive" defaultValue={member.isActive ? "true" : "false"}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="true">Active</option>
              <option value="false">Inactive / Pending</option>
            </select>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || success}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
              {success ? <><Check size={14} /> Saved</> : saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MembersClientPage({ members }: { members: MemberWithStats[] }) {
  const [search, setSearch]   = useState("");
  const [dept, setDept]       = useState<DeptFilter>("ALL");
  const [status, setStatus]   = useState<"ALL" | "ACTIVE" | "PENDING">("ALL");
  const [editing, setEditing] = useState<MemberWithStats | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.universityId.toLowerCase().includes(q);
      const matchDept   = dept === "ALL" || m.department === dept;
      const matchStatus = status === "ALL" || (status === "ACTIVE" && m.isActive) || (status === "PENDING" && !m.isActive);
      return matchSearch && matchDept && matchStatus;
    });
  }, [members, search, dept, status]);

  return (
    <>
      {editing && <EditMemberModal member={editing} onClose={() => setEditing(null)} />}

      <div className="space-y-4">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text" placeholder="Search by name, email or ID…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-slate-400 shrink-0" />
            <select value={dept} onChange={(e) => setDept(e.target.value as DeptFilter)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-slate-700">
              <option value="ALL">All Departments</option>
              {Object.entries(DEPT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm">
            {(["ALL", "ACTIVE", "PENDING"] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-3 py-2 font-medium transition-colors ${status === s ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                {s === "ALL" ? "All" : s === "ACTIVE" ? "Active" : "Pending"}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-400 px-1">
          Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of {members.length} members
        </p>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Member", "Univ. ID", "Department", "Batch", "Role", "Status", ""].map((h, i) => (
                    <th key={i} className={`text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider ${i >= 2 && i <= 3 ? "hidden lg:table-cell" : i === 1 ? "hidden md:table-cell" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-slate-400">
                      <Search size={28} className="mx-auto mb-2 text-slate-200" />
                      <p className="font-medium text-slate-500">No members found</p>
                      <p className="text-xs mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                )}
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{m.name}</p>
                          <p className="text-slate-400 text-xs mt-0.5">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{m.universityId}</span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${DEPT_STYLES[m.department]}`}>
                        {DEPT_LABELS[m.department]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs hidden lg:table-cell font-medium">{m.batch}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_STYLES[m.role]}`}>
                        {ROLE_LABELS[m.role]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {m.isActive ? (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setEditing(m)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        title="Edit member"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-emerald-600">{filtered.filter((m) => m.isActive).length} active</span>
                {" · "}
                <span className="font-semibold text-amber-600">{filtered.filter((m) => !m.isActive).length} pending</span>
              </p>
              <p className="text-xs text-slate-400">{filtered.length} results</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
