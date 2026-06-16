"use client";

import { useState } from "react";
import { CheckCircle, Circle, Save } from "lucide-react";

interface Member {
  id: string;
  name: string;
  universityId: string;
  department: string;
}

interface AttendanceCheckInProps {
  members: Member[];
  eventName: string;
  eventDate: string;
}

export default function AttendanceCheckIn({ members, eventName, eventDate }: AttendanceCheckInProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState("");

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName, eventDate,
        presentIds: Array.from(checked),
        allIds: members.map((m) => m.id),
      }),
    });
    setSaving(false);
    setSaved(true);
  }

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.universityId.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = checked.size;
  const pct = members.length > 0 ? Math.round((presentCount / members.length) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">{eventName}</h3>
            <p className="text-slate-400 text-xs mt-0.5">{eventDate}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              saved
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            } disabled:opacity-60`}
          >
            <Save size={14} />
            {saved ? "Saved!" : saving ? "Saving..." : "Save Attendance"}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500">{presentCount} of {members.length} present</span>
            <span className="font-semibold text-blue-600">{pct}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Member list */}
      <ul className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
        {filtered.map((m) => {
          const isPresent = checked.has(m.id);
          return (
            <li
              key={m.id}
              onClick={() => toggle(m.id)}
              className={`flex items-center gap-4 px-6 py-3.5 cursor-pointer transition-colors ${
                isPresent ? "bg-emerald-50/50" : "hover:bg-slate-50"
              }`}
            >
              <div className={`shrink-0 transition-transform ${isPresent ? "scale-110" : ""}`}>
                {isPresent ? (
                  <CheckCircle size={22} className="text-emerald-500" />
                ) : (
                  <Circle size={22} className="text-slate-200" />
                )}
              </div>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isPresent ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${isPresent ? "text-emerald-700" : "text-slate-900"}`}>
                    {m.name}
                  </p>
                  <p className="text-xs text-slate-400">{m.universityId} · {m.department.replace("_", " ")}</p>
                </div>
              </div>
              {isPresent && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  Present
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
