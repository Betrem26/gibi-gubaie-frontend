"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CouncilSection, CouncilRole } from "@/types/index";
import {
  Building2, BookOpen, Music, DollarSign,
  Megaphone, FlaskConical, Heart, ChevronRight, Check,
} from "lucide-react";

// ── Section picker data ───────────────────────────────────────────────────────

interface SectionOption {
  key:         CouncilSection;
  label:       string;
  amharic:     string;
  description: string;
  icon:        React.ComponentType<{ size?: number; className?: string }>;
  color:       string;
  textColor:   string;
  bgColor:     string;
  borderColor: string;
}

const SECTIONS: SectionOption[] = [
  {
    key: "MAIN_OFFICE", label: "Main Office", amharic: "ዋና ጽ/ቤት",
    description: "Central administration — oversees all sections",
    icon: Building2, color: "border-blue-400 bg-blue-600",
    textColor: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-200",
  },
  {
    key: "EDUCATION", label: "Education", amharic: "ትምህርት ክፍል",
    description: "Academic programs, Bible study & spiritual education",
    icon: BookOpen, color: "border-sky-400 bg-sky-500",
    textColor: "text-sky-700", bgColor: "bg-sky-50", borderColor: "border-sky-200",
  },
  {
    key: "CHOIR", label: "Choir (Zemari)", amharic: "ዘማሪ ክፍል",
    description: "Liturgical chanting and spiritual music ministry",
    icon: Music, color: "border-purple-400 bg-purple-500",
    textColor: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-200",
  },
  {
    key: "FINANCE", label: "Finance", amharic: "ፋይናንስ ክፍል",
    description: "Budgeting, dues collection & financial reporting",
    icon: DollarSign, color: "border-emerald-400 bg-emerald-500",
    textColor: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200",
  },
  {
    key: "PUBLIC_RELATIONS", label: "Public Relations", amharic: "ህዝብ ግንኙነት ክፍል",
    description: "Communications, outreach & community engagement",
    icon: Megaphone, color: "border-amber-400 bg-amber-500",
    textColor: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200",
  },
  {
    key: "RESEARCH", label: "አባላት እንክብካቤ", amharic: "አባላት እንክብካቤ ክፍል",
    description: "Member registration, department assignments & member welfare",
    icon: FlaskConical, color: "border-rose-400 bg-rose-500",
    textColor: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-200",
  },
  {
    key: "CHARITY", label: "Charity (Mitswa)", amharic: "ምጽዋት ክፍል",
    description: "Charitable activities & community service",
    icon: Heart, color: "border-pink-400 bg-pink-500",
    textColor: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-200",
  },
];

const ROLE_OPTIONS: { value: CouncilRole; label: string }[] = [
  { value: "SECTION_HEAD", label: "Section Head" },
  { value: "DEPUTY_HEAD",  label: "Deputy Head" },
  { value: "SECRETARY",    label: "Secretary" },
  { value: "TREASURER",    label: "Treasurer" },
  { value: "COORDINATOR",  label: "Coordinator" },
  { value: "MEMBER",       label: "Member" },
];

// ── Steps ─────────────────────────────────────────────────────────────────────

type Step = "section" | "details";

export default function OnboardingForm({
  defaultName,
  defaultEmail,
}: {
  defaultName:  string;
  defaultEmail: string;
}) {
  const router = useRouter();

  const [step, setStep]               = useState<Step>("section");
  const [selectedSection, setSection] = useState<CouncilSection | null>(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState<string | null>(null);

  // ── Step 1: pick section ──────────────────────────────────────────────────

  if (step === "section") {
    return (
      <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
            <h2 className="font-bold text-slate-900">Choose your council section</h2>
          </div>
          <p className="text-slate-400 text-xs ml-7">Select the section you belong to</p>
        </div>

        <div className="p-4 grid grid-cols-1 gap-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const selected = selectedSection === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                  selected
                    ? `${s.borderColor} ${s.bgColor}`
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selected ? s.bgColor : "bg-slate-100"}`}>
                  <Icon size={16} className={selected ? s.textColor : "text-slate-400"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${selected ? "text-slate-900" : "text-slate-700"}`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{s.amharic} · {s.description}</p>
                </div>
                {selected && <Check size={16} className={s.textColor} />}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => { if (selectedSection) setStep("details"); }}
            disabled={!selectedSection}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-500/25"
          >
            Continue <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: fill in details ───────────────────────────────────────────────

  const sectionMeta = SECTIONS.find((s) => s.key === selectedSection)!;
  const SectionIcon = sectionMeta.icon;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res  = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, section: selectedSection }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to their personal council section page
      router.push(json.redirectUrl);
    } catch {
      setError("Network error — please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200/60 overflow-hidden">
      {/* Step header */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
            <h2 className="font-bold text-slate-900">Your details</h2>
          </div>
          {/* Selected section pill */}
          <button
            onClick={() => setStep("section")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${sectionMeta.bgColor} ${sectionMeta.textColor} ${sectionMeta.borderColor} hover:opacity-80 transition-opacity`}
          >
            <SectionIcon size={11} />
            {sectionMeta.label}
            <span className="text-[10px] opacity-60">· change</span>
          </button>
        </div>
        <p className="text-slate-400 text-xs ml-7 mt-0.5">Fill in your profile information</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            ⚠ {error}
          </div>
        )}

        {/* Name + Email */}
        {[
          { name: "name",  label: "Full Name",     type: "text",  required: true,  defaultValue: defaultName,  placeholder: "e.g. Abebe Kebede" },
          { name: "email", label: "Email Address", type: "email", required: true,  defaultValue: defaultEmail, placeholder: "abebe@example.com" },
        ].map(({ name, label, type, required, defaultValue, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
            <input
              name={name} type={type} required={required}
              defaultValue={defaultValue} placeholder={placeholder}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        ))}

        {/* Phone + University ID */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone</label>
            <input
              name="phone" type="tel" placeholder="+251 9xx xxx xxx"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">University ID <span className="text-red-400">*</span></label>
            <input
              name="universityId" type="text" required placeholder="UGR/XXXX/XX"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Batch + Role */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Batch <span className="text-red-400">*</span></label>
            <input
              name="batch" type="text" required placeholder="e.g. 2022"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your Role</label>
            <select
              name="role" defaultValue="MEMBER"
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {ROLE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Baptismal name */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Baptismal Name <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            name="baptismalName" type="text" placeholder="e.g. Gebre Menfes Qidus"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Short Bio <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="bio" rows={2} placeholder="A few words about yourself…"
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button" onClick={() => setStep("section")}
            className="px-4 border border-slate-200 text-slate-600 hover:bg-slate-50 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            Back
          </button>
          <button
            type="submit" disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            {loading ? "Setting up…" : <>Complete Setup <Check size={15} /></>}
          </button>
        </div>
      </form>
    </div>
  );
}
