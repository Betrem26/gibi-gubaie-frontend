"use client";

import { useState, useMemo } from "react";
import { Search, Save, Users, CheckCircle, Calendar } from "lucide-react";
import { Department } from "@/types/index";
import { useApiFetch } from "@/lib/client-fetch";

type Member = { id: string; name: string; universityId: string; department: Department };

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
  EDUCATION:        "bg-sky-100 text-sky-700",
  CHOIR:            "bg-purple-100 text-purple-700",
  FINANCE:          "bg-emerald-100 text-emerald-700",
  PUBLIC_RELATIONS: "bg-amber-100 text-amber-700",
  RESEARCH:         "bg-rose-100 text-rose-700",
  CHARITY:          "bg-pink-100 text-pink-700",
  SUNDAY_SCHOOL:    "bg-indigo-100 text-indigo-700",
  MAHIBER:          "bg-teal-100 text-teal-700",
};

const EVENT_NAMES = [
  "Weekly Meeting",
  "Prayer Session",
  "Bible Study",
  "Choir Practice",
  "Community Service",
  "Special Event",
];

export default function AttendanceClientPage({
  members,
  initialEventName,
  initialEventDate,
  initialPresent,
}: {
  members: Member[];
  initialEventName: string;
  initialEventDate: string;
  initialPresent: string[];
}) {
  const [eventName, setEventName]   = useState(initialEventName);
  const [eventDate, setEventDate]   = useState(initialEventDate);
  const [present, setPresent]       = useState<Set<string>>(new Set(initialPresent));
  const [search, setSearch]         = useState("");
  const [deptFilter, setDept]       = useState<Department | "ALL">("ALL");
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);
  const [saveError, setSaveError]   = useState<string | null>(null);

  const apiFetch = useApiFetch();

  function toggle(id: string) {
    setSaved(false); setSaveError(null);
    setPresent((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function markAll(value: boolean) {
    setSaved(false); setSaveError(null);
    setPresent(value ? new Set(filtered.map((m) => m.id)) : new Set());
  }

  async function save() {
    setSaving(true); setSaveError(null);
    try {
      await apiFetch("/api/attendance", {
        method: "POST",
        body: JSON.stringify({
          eventName, eventDate,
          presentIds: Array.from(present),
          allIds: members.map((m) => m.id),
        }),
      });
      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.universityId.toLowerCase().includes(q);
      const matchDept   = deptFilter === "ALL" || m.department === deptFilter;
      return matchSearch && matchDept;
    });
  }, [members, search, deptFilter]);

  const presentCount = present.size;
  const pct = members.length > 0 ? Math.round((presentCount / members.length) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Event selector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={15} className="text-blue-600" />
          <p className="text-sm font-bold text-slate-700">Event Details</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Event Name</label>
            <select
              value={eventName}
              onChange={(e) => { setEventName(e.target.value); setSaved(false); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              {EVENT_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date</label>
            <input
              type="date" value={eventDate}
              onChange={(e) => { setEventDate(e.target.value); setSaved(false); setPresent(new Set()); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Active", value: members.length, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
          { label: "Present",      value: presentCount,   color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Absent",       value: members.length - presentCount, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl p-4 text-center`}>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-semibold">{label}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-600">Attendance Rate</span>
          <span className={`font-black text-lg ${pct >= 75 ? "text-emerald-600" : pct >= 50 ? "text-amber-600" : "text-rose-600"}`}>{pct}%</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text" placeholder="Search members…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <select
            value={deptFilter} onChange={(e) => setDept(e.target.value as Department | "ALL")}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-slate-700"
          >
            <option value="ALL">All Departments</option>
            {Object.entries(DEPT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="flex gap-2">
            <button onClick={() => markAll(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors">
              <CheckCircle size={13} /> All Present
            </button>
            <button onClick={() => markAll(false)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors">
              <Users size={13} /> Clear
            </button>
          </div>
          <button
            onClick={save} disabled={saving || saved}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              saved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            } disabled:opacity-60`}
          >
            <Save size={14} />
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save"}
          </button>
        </div>
        {saveError && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {saveError}</p>
        )}
      </div>

      {/* Member list */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{filtered.length} members</p>
          <p className="text-xs text-slate-400">{filtered.filter((m) => present.has(m.id)).length} present in view</p>
        </div>
        <ul className="divide-y divide-slate-100 max-h-[540px] overflow-y-auto scrollbar-thin">
          {filtered.length === 0 && (
            <li className="text-center py-12 text-slate-400">
              <Search size={24} className="mx-auto mb-2 text-slate-200" />
              <p className="text-sm">No members match your search</p>
            </li>
          )}
          {filtered.map((m) => {
            const isPresent = present.has(m.id);
            return (
              <li
                key={m.id}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors cursor-pointer ${isPresent ? "bg-emerald-50/50" : "hover:bg-slate-50"}`}
                onClick={() => toggle(m.id)}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${isPresent ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isPresent ? "text-emerald-800" : "text-slate-900"}`}>{m.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-xs text-slate-400">{m.universityId}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DEPT_STYLES[m.department]}`}>
                      {DEPT_LABELS[m.department]}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${isPresent ? "text-emerald-600" : "text-slate-300"}`}>
                  {isPresent ? "Present" : "Absent"}
                </span>
                {/* Toggle */}
                <div
                  role="switch" aria-checked={isPresent}
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${isPresent ? "bg-emerald-500" : "bg-slate-200"}`}
                >
                  <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isPresent ? "translate-x-6" : "translate-x-1"}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
