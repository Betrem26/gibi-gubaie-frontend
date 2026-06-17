"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { Department, GibiRole, DEPARTMENTS, GIBI_ROLES } from "@/types/index";

const DEPARTMENTS_LIST = DEPARTMENTS;
const ROLES = GIBI_ROLES;

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

export default function AddMemberForm() {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleOpen() { setOpen(true); setError(null); setSuccess(false); }
  function handleClose() { setOpen(false); setError(null); setSuccess(false); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res  = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Failed to save member. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      form.reset();
      setTimeout(() => { handleClose(); window.location.reload(); }, 900);
    } catch {
      setError("Network error — please check your connection.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-500/25"
      >
        <UserPlus size={16} /> Add Member
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md ring-1 ring-slate-200/60">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Add New Member</h3>
                <p className="text-slate-400 text-xs mt-0.5">Fill in the details below</p>
              </div>
              <button
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
                  <span className="mt-0.5">⚠</span> {error}
                </div>
              )}
              {success && (
                <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
                  ✓ Member added successfully!
                </div>
              )}

              {/* Name + Email */}
              <div className="space-y-3">
                {[
                  { name: "name",         label: "Full Name",      type: "text",  required: true,  placeholder: "e.g. Abebe Kebede" },
                  { name: "email",        label: "Email Address",  type: "email", required: true,  placeholder: "abebe@example.com" },
                ].map(({ name, label, type, required, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                    <input
                      name={name} type={type} required={required} placeholder={placeholder}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Phone + University ID */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "phone",        label: "Phone",          type: "tel",   required: false, placeholder: "+251 9xx xxx xxx" },
                  { name: "universityId", label: "University ID",  type: "text",  required: true,  placeholder: "UGR/XXXX/XX" },
                ].map(({ name, label, type, required, placeholder }) => (
                  <div key={name}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                    <input
                      name={name} type={type} required={required} placeholder={placeholder}
                      className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Batch + Department + Role */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Batch</label>
                  <input
                    name="batch" type="text" required placeholder="2022"
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Department</label>
                  <select
                    name="department" required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    {DEPARTMENTS_LIST.map((d) => (
                      <option key={d} value={d}>{DEPT_LABELS[d]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role</label>
                  <select
                    name="role"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button" onClick={handleClose}
                  className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={loading || success}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  {success ? "Saved ✓" : loading ? "Saving…" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
