"use client";

import { useState } from "react";
import { CouncilSection, CouncilRole } from "@/types/index";
import { ROLE_LABELS, SECTION_TO_SLUG, SECTION_SUB_SECTIONS } from "@/lib/council-data";
import { Pencil, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface CouncilMemberData {
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
}

// Only plain serializable fields — no icon component
export interface SerializableMeta {
  label:       string;
  bgColor:     string;
  textColor:   string;
  borderColor: string;
}

const ALL_SECTIONS = [
  "MAIN_OFFICE", "EDUCATION", "CHOIR", "FINANCE",
  "PUBLIC_RELATIONS", "RESEARCH", "CHARITY", "BATCH_COORDINATION",
] as CouncilSection[];

const SECTION_LABELS: Record<CouncilSection, string> = {
  MAIN_OFFICE:          "Main Office",
  EDUCATION:            "Education",
  CHOIR:                "Choir & Fine Arts",
  FINANCE:              "Development",
  PUBLIC_RELATIONS:     "Public Relations",
  RESEARCH:             "አባላት እንክብካቤ",
  CHARITY:              "Charity",
  BATCH_COORDINATION:   "Batch & Coordination",
};

export default function CouncilMemberProfileClient({
  member,
  meta,
}: {
  member: CouncilMemberData;
  meta: SerializableMeta;
}) {
  const [open, setOpen]       = useState(false);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res  = await fetch("/api/council", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: member.id, ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) { setError(json.error ?? "Failed to update."); setSaving(false); return; }
      setSuccess(true);
      setSaving(false);
      // If section changed, redirect to new section's profile URL
      const newSection = (data.section as CouncilSection) ?? member.section;
      const newSlug = SECTION_TO_SLUG[newSection];
      setTimeout(() => {
        setOpen(false);
        router.push(`/council/${newSlug}/${member.id}`);
        router.refresh();
      }, 800);
    } catch {
      setError("Network error.");
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); setError(null); setSuccess(false); }}
        className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shrink-0"
      >
        <Pencil size={14} /> Edit Profile
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg ring-1 ring-slate-200/60 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-bold text-slate-900">Edit Profile</h3>
                <p className="text-slate-400 text-xs mt-0.5">{member.name}</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error   && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {error}</p>}
              {success && <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">✓ Profile updated!</p>}

              {[
                { name: "name",  label: "Full Name",     type: "text",  defaultValue: member.name },
                { name: "email", label: "Email",         type: "email", defaultValue: member.email },
                { name: "phone", label: "Phone",         type: "tel",   defaultValue: member.phone ?? "" },
                { name: "universityId", label: "University ID", type: "text", defaultValue: member.universityId },
                { name: "batch", label: "Batch",         type: "text",  defaultValue: member.batch },
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
                  <select name="section" defaultValue={member.section}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {ALL_SECTIONS.map((s) => (
                      <option key={s} value={s}>{SECTION_LABELS[s]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
                  <select name="role" defaultValue={member.role}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {(Object.keys(ROLE_LABELS) as CouncilRole[]).map((r) => (
                      <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sub-section */}
              {(() => {
                const subs = SECTION_SUB_SECTIONS[member.section];
                if (!subs || subs.length === 0) return null;
                return (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sub-section</label>
                    <select name="subSection" defaultValue={member.subSection ?? ""}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">— No sub-section —</option>
                      {subs.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}  ({s.labelEn})</option>
                      ))}
                    </select>
                  </div>
                );
              })()}

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

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Bio</label>
                <textarea name="bio" rows={3} defaultValue={member.bio ?? ""}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Photo URL (optional)</label>
                <input name="photoUrl" type="url" defaultValue={member.photoUrl ?? ""} placeholder="https://…"
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setOpen(false)}
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
      )}
    </>
  );
}
