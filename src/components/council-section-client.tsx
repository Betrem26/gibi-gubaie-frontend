"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CouncilSection, CouncilRole } from "@/types/index";
import {
  ROLE_LABELS,
  ROLE_STYLES,
  SECTION_TO_SLUG,
  SECTION_SUB_SECTIONS,
  SECTION_DATA,
} from "@/lib/council-data";
import {
  Search, UserPlus, Pencil, X, Check,
  Mail, Phone, GraduationCap, ChevronRight, Layers,
} from "lucide-react";

// ── Exported meta type (no icon — safe to pass from server) ──────────────────
export interface SerializableSectionMeta {
  label:       string;
  bgColor:     string;
  textColor:   string;
  borderColor: string;
}

// ── Member row type ───────────────────────────────────────────────────────────
interface CouncilMemberRow {
  id:            string;
  name:          string;
  email:         string;
  phone:         string | null;
  universityId:  string;
  section:       CouncilSection;
  subSection:    string | null;
  role:          CouncilRole;
  batch:         string;
  baptismalName: string | null;
  bio:           string | null;
  photoUrl:      string | null;
  isActive:      boolean;
  joinedAt:      Date;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const ALL_SECTION_KEYS = [
  "MAIN_OFFICE", "EDUCATION", "CHOIR", "FINANCE",
  "PUBLIC_RELATIONS", "RESEARCH", "CHARITY", "BATCH_COORDINATION",
] as CouncilSection[];

const SECTION_LABELS: Record<CouncilSection, string> = {
  MAIN_OFFICE:        "Main Office",
  EDUCATION:          "Education",
  CHOIR:              "Choir & Fine Arts",
  FINANCE:            "Development",
  PUBLIC_RELATIONS:   "Public Relations",
  RESEARCH:           "አባላት እንክብካቤ",
  CHARITY:            "Charity",
  BATCH_COORDINATION: "Batch & Coordination",
};

// ── Sub-section dropdown (reused in modals) ───────────────────────────────────
function SubSectionSelect({
  section, name, defaultValue,
}: {
  section: CouncilSection; name: string; defaultValue?: string | null;
}) {
  const subs = SECTION_SUB_SECTIONS[section];
  if (!subs || subs.length === 0) return null;
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        Sub-section <span className="text-slate-400 font-normal">(optional)</span>
      </label>
      <select name={name} defaultValue={defaultValue ?? ""}
        className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
        <option value="">— No sub-section —</option>
        {subs.map((s) => (
          <option key={s.key} value={s.key}>{s.label}  ({s.labelEn})</option>
        ))}
      </select>
    </div>
  );
}

// ── Add Member Modal ──────────────────────────────────────────────────────────
function AddMemberModal({ defaultSection, defaultSubSection, onClose }: {
  defaultSection: CouncilSection; defaultSubSection: string | null; onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res  = await fetch("/api/council", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json.error ?? "Failed to add member."); setLoading(false); return; }
      setSuccess(true); setLoading(false);
      setTimeout(() => { onClose(); window.location.reload(); }, 800);
    } catch { setError("Network error."); setLoading(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg ring-1 ring-slate-200/60 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div><h3 className="font-bold text-slate-900">Add Council Member</h3><p className="text-slate-400 text-xs mt-0.5">Fill in the details below</p></div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error   && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">⚠ {error}</p>}
          {success && <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">✓ Member added!</p>}
          {[
            { name: "name",  label: "Full Name",     type: "text",  required: true,  placeholder: "e.g. Abebe Kebede" },
            { name: "email", label: "Email Address", type: "email", required: true,  placeholder: "abebe@example.com" },
          ].map(({ name, label, type, required, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
              <input name={name} type={type} required={required} placeholder={placeholder}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone</label>
              <input name="phone" type="tel" placeholder="+251 9xx xxx xxx"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">University ID</label>
              <input name="universityId" type="text" required placeholder="UGR/XXXX/XX"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Batch</label>
              <input name="batch" type="text" required placeholder="2022"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Section</label>
              {/* Lock section to defaultSection when not main office — section heads can only add to their own section */}
              <input type="hidden" name="section" value={defaultSection} />
              <div className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-500 bg-slate-50">
                {SECTION_LABELS[defaultSection]}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <select name="role" defaultValue="MEMBER"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {(Object.keys(ROLE_LABELS) as CouncilRole[]).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
              </select>
            </div>
          </div>
          <SubSectionSelect section={defaultSection} name="subSection" defaultValue={defaultSubSection} />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Baptismal Name <span className="text-slate-400 font-normal">(optional)</span></label>
            <input name="baptismalName" type="text" placeholder="e.g. Gebre Menfes Qidus"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors">Cancel</button>
            <button type="submit" disabled={loading || success}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
              {success ? <><Check size={14} /> Added</> : loading ? "Saving…" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Edit Member Modal ─────────────────────────────────────────────────────────
function EditMemberModal({ member, onClose }: { member: CouncilMemberRow; onClose: () => void; }) {
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true); setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res  = await fetch("/api/council", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: member.id, ...data }) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json.error ?? "Failed to update."); setSaving(false); return; }
      setSuccess(true); setSaving(false);
      setTimeout(() => { onClose(); window.location.reload(); }, 800);
    } catch { setError("Network error."); setSaving(false); }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg ring-1 ring-slate-200/60 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div><h3 className="font-bold text-slate-900">Edit Member</h3><p className="text-slate-400 text-xs mt-0.5">{member.name}</p></div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error   && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {error}</p>}
          {success && <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">✓ Updated!</p>}
          {[
            { name: "name",         label: "Full Name",     type: "text",  defaultValue: member.name },
            { name: "email",        label: "Email",         type: "email", defaultValue: member.email },
            { name: "phone",        label: "Phone",         type: "tel",   defaultValue: member.phone ?? "" },
            { name: "universityId", label: "University ID", type: "text",  defaultValue: member.universityId },
            { name: "batch",        label: "Batch",         type: "text",  defaultValue: member.batch },
          ].map(({ name, label, type, defaultValue }) => (
            <div key={name}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
              <input name={name} type={type} defaultValue={defaultValue}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Section</label>
              {/* Section is locked — only Main Office / አባላት እንክብካቤ can reassign across sections */}
              <input type="hidden" name="section" value={member.section} />
              <div className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-500 bg-slate-50">
                {SECTION_LABELS[member.section]}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
              <select name="role" defaultValue={member.role}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                {(Object.keys(ROLE_LABELS) as CouncilRole[]).map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
              </select>
            </div>
          </div>
          <SubSectionSelect section={member.section} name="subSection" defaultValue={member.subSection} />
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
            <select name="isActive" defaultValue={member.isActive ? "true" : "false"}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Baptismal Name</label>
            <input name="baptismalName" type="text" defaultValue={member.baptismalName ?? ""}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors">Cancel</button>
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
export default function CouncilSectionClient({
  members,
  section,
  isMainOffice = false,
  canManage    = false,
  meta,
}: {
  members:       CouncilMemberRow[];
  section:       CouncilSection;
  isMainOffice?: boolean;
  canManage?:    boolean;
  meta:          SerializableSectionMeta;
}) {
  // Sub-sections only relevant on non-main-office pages
  const subSections    = isMainOffice ? [] : (SECTION_SUB_SECTIONS[section] ?? []);
  const hasSubSections = subSections.length > 0;

  const [search,        setSearch]        = useState("");
  const [activeSubSec,  setActiveSubSec]  = useState<string | null>(null);
  const [sectionFilter, setSectionFilter] = useState<CouncilSection | "ALL">("ALL");
  const [roleFilter,    setRoleFilter]    = useState<CouncilRole | "ALL">("ALL");
  const [statusFilter,  setStatusFilter]  = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [adding,        setAdding]        = useState(false);
  const [editing,       setEditing]       = useState<CouncilMemberRow | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchSearch  = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.universityId.toLowerCase().includes(q);
      const matchSubSec  = !hasSubSections || activeSubSec === null || m.subSection === activeSubSec;
      const matchSection = !isMainOffice || sectionFilter === "ALL" || m.section === sectionFilter;
      const matchRole    = roleFilter === "ALL"   || m.role === roleFilter;
      const matchStatus  = statusFilter === "ALL" || (statusFilter === "ACTIVE" && m.isActive) || (statusFilter === "INACTIVE" && !m.isActive);
      return matchSearch && matchSubSec && matchSection && matchRole && matchStatus;
    });
  }, [members, search, activeSubSec, sectionFilter, roleFilter, statusFilter, hasSubSections, isMainOffice]);

  const sectionSlug = SECTION_TO_SLUG[section];

  const subSectionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const m of members) if (m.subSection) map[m.subSection] = (map[m.subSection] ?? 0) + 1;
    return map;
  }, [members]);

  return (
    <>
      {adding  && <AddMemberModal defaultSection={section} defaultSubSection={activeSubSec} onClose={() => setAdding(false)} />}
      {editing && <EditMemberModal member={editing} onClose={() => setEditing(null)} />}

      <div className="space-y-4">

        {/* ── Main Office: section filter strip ──────────────────────────── */}
        {isMainOffice && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Filter by section:</span>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setSectionFilter("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  sectionFilter === "ALL" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                All ({members.length})
              </button>
              {ALL_SECTION_KEYS.filter(s => s !== "MAIN_OFFICE").map((s) => {
                const sd    = SECTION_DATA[s];
                const count = members.filter(m => m.section === s).length;
                if (!sd || count === 0) return null;
                return (
                  <button key={s} onClick={() => setSectionFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      sectionFilter === s
                        ? `${sd.bgColor} ${sd.textColor} ${sd.borderColor}`
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {sd.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Sub-section tabs (non-main-office sections that have subs) ── */}
        {hasSubSections && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 pt-3 pb-0 border-b border-slate-100">
              <div className="flex items-center gap-1 overflow-x-auto pb-0 scrollbar-thin">
                {/* All tab */}
                <button onClick={() => setActiveSubSec(null)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-colors shrink-0 ${
                    activeSubSec === null
                      ? "border-blue-600 text-blue-700 bg-blue-50"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Layers size={12} />
                  All
                  <span className="ml-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{members.length}</span>
                </button>
                {subSections.map((sub) => {
                  const count    = subSectionCounts[sub.key] ?? 0;
                  const isActive = activeSubSec === sub.key;
                  return (
                    <button key={sub.key} onClick={() => setActiveSubSec(sub.key)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-lg border-b-2 whitespace-nowrap transition-colors shrink-0 ${
                        isActive
                          ? "border-blue-600 text-blue-700 bg-blue-50"
                          : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {sub.label}
                      {count > 0 && (
                        <span className={`ml-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isActive ? "bg-blue-200 text-blue-700" : "bg-slate-200 text-slate-600"
                        }`}>{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {activeSubSec && (
              <div className="px-4 py-2 bg-blue-50/50">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-blue-700">{subSections.find(s => s.key === activeSubSec)?.label}</span>
                  {" · "}{subSections.find(s => s.key === activeSubSec)?.labelEn}
                  {" · "}<span className="text-emerald-600 font-semibold">{filtered.filter(m => m.isActive).length} active</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Toolbar ──────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name, email or ID…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as CouncilRole | "ALL")}
              className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-slate-700">
              <option value="ALL">All Roles</option>
              {(Object.keys(ROLE_LABELS) as CouncilRole[]).map((r) => (
                <option key={r} value={r}>{ROLE_LABELS[r]}</option>
              ))}
            </select>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden text-sm">
              {(["ALL", "ACTIVE", "INACTIVE"] as const).map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-2 font-medium transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                  {s === "ALL" ? "All" : s === "ACTIVE" ? "Active" : "Inactive"}
                </button>
              ))}
            </div>
            {canManage && (
              <button onClick={() => setAdding(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-blue-500/25">
                <UserPlus size={15} />
                {activeSubSec
                  ? `Add to ${subSections.find(s => s.key === activeSubSec)?.label ?? activeSubSec}`
                  : "Add Member"
                }
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-400 px-1">
          Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of {members.length} members
        </p>

        {/* ── Members table ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Member</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  {isMainOffice && (
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Section</th>
                  )}
                  {hasSubSections && (
                    <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Sub-section</th>
                  )}
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Univ. ID</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 w-10" />
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
                {filtered.map((m) => {
                  const initials    = m.name.split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
                  // Links always go to the member's OWN section page
                  const memberSlug  = SECTION_TO_SLUG[m.section] ?? sectionSlug;
                  const memberHref  = `/council/${memberSlug}/${m.id}`;
                  const memberSubs  = SECTION_SUB_SECTIONS[m.section] ?? [];
                  const subLabel    = m.subSection ? (memberSubs.find(s => s.key === m.subSection)?.label ?? m.subSection) : null;
                  const sectionInfo = SECTION_DATA[m.section];

                  return (
                    <tr key={m.id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* Member name + avatar */}
                      <td className="px-5 py-3.5">
                        <Link href={memberHref} className="flex items-center gap-3 group/link">
                          <div className={`w-9 h-9 rounded-xl ${sectionInfo?.bgColor ?? meta.bgColor} flex items-center justify-center shrink-0`}>
                            <span className={`text-xs font-bold ${sectionInfo?.textColor ?? meta.textColor}`}>{initials}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-tight group-hover/link:text-blue-600 transition-colors">{m.name}</p>
                            {m.baptismalName && <p className="text-slate-400 text-xs mt-0.5">✝ {m.baptismalName}</p>}
                          </div>
                          <ChevronRight size={13} className="text-slate-200 group-hover/link:text-blue-400 transition-colors ml-1" />
                        </Link>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500"><Mail size={11} className="text-slate-300" /> {m.email}</div>
                          {m.phone && <div className="flex items-center gap-1.5 text-xs text-slate-400"><Phone size={11} className="text-slate-300" /> {m.phone}</div>}
                        </div>
                      </td>

                      {/* Section badge — Main Office only */}
                      {isMainOffice && (
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          <Link href={`/council/${memberSlug}`}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border hover:opacity-80 transition-opacity ${sectionInfo?.bgColor ?? ""} ${sectionInfo?.textColor ?? ""} ${sectionInfo?.borderColor ?? ""}`}>
                            {sectionInfo?.label ?? m.section}
                          </Link>
                        </td>
                      )}

                      {/* Sub-section badge */}
                      {hasSubSections && (
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          {subLabel
                            ? <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${meta.bgColor} ${meta.textColor} border ${meta.borderColor}`}>{subLabel}</span>
                            : <span className="text-slate-300 text-xs">—</span>
                          }
                        </td>
                      )}

                      {/* University ID */}
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap size={12} className="text-slate-300" />
                          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{m.universityId}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-3.5">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${ROLE_STYLES[m.role]}`}>{ROLE_LABELS[m.role]}</span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        {m.isActive
                          ? <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active</span>
                          : <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Inactive</span>
                        }
                      </td>

                      {/* Edit — managers only */}
                      <td className="px-5 py-3.5">
                        {canManage && (
                          <button onClick={() => setEditing(m)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all" title="Edit member">
                            <Pencil size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-emerald-600">{filtered.filter(m => m.isActive).length} active</span>
                {" · "}
                <span className="font-semibold text-amber-600">{filtered.filter(m => !m.isActive).length} inactive</span>
              </p>
              <p className="text-xs text-slate-400">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
