"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CouncilSection, CouncilRole } from "@/types/index";
import {
  Building2, BookOpen, Music, DollarSign, Megaphone,
  FlaskConical, Heart, Check, ChevronRight, Eye, EyeOff,
  ArrowLeft, Loader2, CalendarClock,
} from "lucide-react";

// ── Section data ──────────────────────────────────────────────────────────────

interface SectionOption {
  key:         CouncilSection;
  label:       string;
  amharic:     string;
  description: string;
  icon:        React.ComponentType<{ size?: number; className?: string }>;
  textColor:   string;
  bgColor:     string;
  borderColor: string;
  ringColor:   string;
}

const SECTIONS: SectionOption[] = [
  {
    key: "MAIN_OFFICE",      label: "Main Office",        amharic: "ዋና ጽ/ቤት",
    description: "Central administration — oversees all sections",
    icon: Building2,    textColor: "text-blue-700",    bgColor: "bg-blue-50",    borderColor: "border-blue-300",   ringColor: "ring-blue-400",
  },
  {
    key: "EDUCATION",        label: "Education",          amharic: "ትምህርት ክፍል",
    description: "Academic programs, Bible study & spiritual education",
    icon: BookOpen,     textColor: "text-sky-700",     bgColor: "bg-sky-50",     borderColor: "border-sky-300",    ringColor: "ring-sky-400",
  },
  {
    key: "CHOIR",            label: "Choir (Zemari)",     amharic: "ዘማሪ ክፍል",
    description: "Liturgical chanting and spiritual music ministry",
    icon: Music,        textColor: "text-purple-700",  bgColor: "bg-purple-50",  borderColor: "border-purple-300", ringColor: "ring-purple-400",
  },
  {
    key: "FINANCE",          label: "Finance",            amharic: "ፋይናንስ ክፍል",
    description: "Budgeting, dues collection & financial reporting",
    icon: DollarSign,   textColor: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-300",ringColor: "ring-emerald-400",
  },
  {
    key: "PUBLIC_RELATIONS", label: "Public Relations",   amharic: "ህዝብ ግንኙነት ክፍል",
    description: "Communications, outreach & community engagement",
    icon: Megaphone,    textColor: "text-amber-700",   bgColor: "bg-amber-50",   borderColor: "border-amber-300",  ringColor: "ring-amber-400",
  },
  {
    key: "RESEARCH",         label: "አባላት እንክብካቤ",      amharic: "አባላት እንክብካቤ ክፍል",
    description: "Member registration, department assignments & member welfare",
    icon: FlaskConical, textColor: "text-rose-700",    bgColor: "bg-rose-50",    borderColor: "border-rose-300",   ringColor: "ring-rose-400",
  },
  {
    key: "CHARITY",          label: "Charity (Mitswa)",   amharic: "ምጽዋት ክፍል",
    description: "Charitable activities & community service",
    icon: Heart,        textColor: "text-pink-700",    bgColor: "bg-pink-50",    borderColor: "border-pink-300",   ringColor: "ring-pink-400",
  },
  {
    key: "BATCH_COORDINATION", label: "Batch & Coordination", amharic: "ባች እና ማስተባበሪያ ክፍል",
    description: "Announcements, programs, travel, committees & member affairs",
    icon: CalendarClock, textColor: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-300", ringColor: "ring-indigo-400",
  },
];

const ROLE_OPTIONS: { value: CouncilRole; label: string; description: string }[] = [
  { value: "SECTION_HEAD", label: "Section Head",  description: "Leads the section" },
  { value: "DEPUTY_HEAD",  label: "Deputy Head",   description: "Assists the section head" },
  { value: "SECRETARY",    label: "Secretary",     description: "Handles records & minutes" },
  { value: "TREASURER",    label: "Treasurer",     description: "Manages finances" },
  { value: "COORDINATOR",  label: "Coordinator",   description: "Coordinates activities" },
  { value: "MEMBER",       label: "Member",        description: "General member" },
];

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "w-4 h-1.5 bg-blue-600"
              : i === current
              ? "w-6 h-1.5 bg-blue-600"
              : "w-1.5 h-1.5 bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Step = 0 | 1 | 2 | 3; // 0=section, 1=details, 2=account, 3=verify

interface FormData {
  section:       CouncilSection | null;
  role:          CouncilRole;
  name:          string;
  universityId:  string;
  batch:         string;
  phone:         string;
  baptismalName: string;
  bio:           string;
  email:         string;
  password:      string;
}

export default function CustomSignUp() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [step, setStep]     = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const [form, setForm] = useState<FormData>({
    section:       null,
    role:          "MEMBER",
    name:          "",
    universityId:  "",
    batch:         "",
    phone:         "",
    baptismalName: "",
    bio:           "",
    email:         "",
    password:      "",
  });

  function set(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  }

  // ── Step 0: Pick council section ──────────────────────────────────────────

  if (step === 0) {
    return (
      <div className="w-full max-w-md mx-auto">
        <StepDots current={0} total={4} />
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-white font-bold text-lg">Choose your council section</h2>
            <p className="text-blue-200/70 text-xs mt-1">Select the section you will serve in</p>
          </div>

          <div className="px-4 pb-4 grid grid-cols-1 gap-2 max-h-[420px] overflow-y-auto">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              const selected = form.section === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => { set("section", s.key); }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${
                    selected
                      ? `border-white/60 bg-white/20`
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-white/20" : "bg-white/10"}`}>
                    <Icon size={16} className={selected ? "text-white" : "text-white/50"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-tight ${selected ? "text-white" : "text-white/80"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5 truncate">{s.amharic}</p>
                  </div>
                  {selected
                    ? <Check size={16} className="text-white shrink-0" />
                    : <ChevronRight size={14} className="text-white/20 shrink-0" />
                  }
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-5">
            <button
              onClick={() => { if (form.section) setStep(1); }}
              disabled={!form.section}
              className="w-full flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed py-3 rounded-xl text-sm font-bold transition-all shadow-lg"
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-5">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-300 hover:text-white font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  // ── Step 1: Personal details ──────────────────────────────────────────────

  const sectionMeta = SECTIONS.find((s) => s.key === form.section)!;
  const SectionIcon = sectionMeta.icon;

  if (step === 1) {
    function validateDetails() {
      if (!form.name.trim())         { setError("Full name is required."); return false; }
      if (!form.universityId.trim()) { setError("University ID is required."); return false; }
      if (!form.batch.trim())        { setError("Batch year is required."); return false; }
      return true;
    }

    return (
      <div className="w-full max-w-md mx-auto">
        <StepDots current={1} total={4} />
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-white font-bold text-lg">Your details</h2>
              <p className="text-blue-200/70 text-xs mt-1">Tell us about yourself</p>
            </div>
            <button
              onClick={() => setStep(0)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold ${sectionMeta.bgColor} ${sectionMeta.textColor} border ${sectionMeta.borderColor} hover:opacity-80 transition-opacity shrink-0`}
            >
              <SectionIcon size={11} /> {sectionMeta.label}
            </button>
          </div>

          <div className="px-6 pb-6 space-y-3">
            {error && (
              <div className="text-xs text-red-200 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2.5">
                ⚠ {error}
              </div>
            )}

            {/* Full name */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <input
                type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. Abebe Kebede"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
              />
            </div>

            {/* University ID + Batch */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">University ID <span className="text-red-400">*</span></label>
                <input
                  type="text" value={form.universityId} onChange={(e) => set("universityId", e.target.value)}
                  placeholder="UGR/XXXX/XX"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Batch <span className="text-red-400">*</span></label>
                <input
                  type="text" value={form.batch} onChange={(e) => set("batch", e.target.value)}
                  placeholder="e.g. 2022"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Your Role in {sectionMeta.label}</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLE_OPTIONS.map(({ value, label, description }) => {
                  const selected = form.role === value;
                  return (
                    <button
                      key={value} type="button"
                      onClick={() => set("role", value)}
                      className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                        selected
                          ? "border-white/50 bg-white/20"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 w-full">
                        <span className={`text-xs font-semibold ${selected ? "text-white" : "text-white/70"}`}>{label}</span>
                        {selected && <Check size={11} className="text-white ml-auto" />}
                      </div>
                      <span className="text-[10px] text-white/40 mt-0.5">{description}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Phone <span className="text-white/30 font-normal">(optional)</span></label>
              <input
                type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                placeholder="+251 9xx xxx xxx"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
              />
            </div>

            {/* Baptismal name */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Baptismal Name <span className="text-white/30 font-normal">(optional)</span></label>
              <input
                type="text" value={form.baptismalName} onChange={(e) => set("baptismalName", e.target.value)}
                placeholder="e.g. Gebre Menfes Qidus"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button" onClick={() => setStep(0)}
                className="flex items-center gap-1.5 px-4 border border-white/20 text-white/70 hover:bg-white/10 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="button"
                onClick={() => { if (validateDetails()) setStep(2); }}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 2: Create account (email + password) ─────────────────────────────

  if (step === 2) {
    async function handleCreateAccount() {
      if (!form.email.trim())       { setError("Email is required."); return; }
      if (!form.password.trim())    { setError("Password is required."); return; }
      if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
      if (!isLoaded || !signUp)     { setError("Auth not ready. Please refresh."); return; }

      setLoading(true);
      setError(null);

      try {
        // Split name into first/last for Clerk
        const nameParts = form.name.trim().split(" ");
        const firstName = nameParts[0] ?? "";
        const lastName  = nameParts.slice(1).join(" ") || undefined;

        await signUp.create({
          firstName,
          lastName,
          emailAddress: form.email.trim().toLowerCase(),
          password:     form.password,
        });

        // Send email verification code
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

        // Only advance step after both calls succeed
        setLoading(false);
        setStep(3);
      } catch (err: unknown) {
        const clerkErr = err as { errors?: { longMessage?: string; message: string }[] };
        const msg =
          clerkErr?.errors?.[0]?.longMessage ??
          clerkErr?.errors?.[0]?.message ??
          "Failed to create account. Please try again.";
        setError(msg);
        setLoading(false);
      }
    }

    return (
      <div className="w-full max-w-md mx-auto">
        <StepDots current={2} total={4} />
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
          <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-white font-bold text-lg">Create your account</h2>
              <p className="text-blue-200/70 text-xs mt-1">Set your login credentials</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold ${sectionMeta.bgColor} ${sectionMeta.textColor} border ${sectionMeta.borderColor} hover:opacity-80 transition-opacity shrink-0`}
            >
              <SectionIcon size={11} /> {sectionMeta.label}
            </button>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {error && (
              <div className="text-xs text-red-200 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2.5">
                ⚠ {error}
              </div>
            )}

            {/* Summary card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Joining as</p>
              <p className="text-sm font-semibold text-white">{form.name || "—"}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sectionMeta.bgColor} ${sectionMeta.textColor} border ${sectionMeta.borderColor}`}>
                  {sectionMeta.label}
                </span>
                <span className="text-[10px] text-white/40">
                  {ROLE_OPTIONS.find((r) => r.value === form.role)?.label} · {form.universityId || "—"} · Batch {form.batch || "—"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Email Address <span className="text-red-400">*</span></label>
              <input
                type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                placeholder="abebe@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password} onChange={(e) => set("password", e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all"
                />
                <button
                  type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-1">At least 8 characters</p>
            </div>

            {/* Required by Clerk Smart CAPTCHA for custom flows */}
            <div id="clerk-captcha" />

            <div className="flex gap-3 pt-1">
              <button
                type="button" onClick={() => setStep(1)}
                className="flex items-center gap-1.5 px-4 border border-white/20 text-white/70 hover:bg-white/10 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                type="button" onClick={handleCreateAccount} disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 disabled:opacity-60 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
              >
                {loading ? <><Loader2 size={15} className="animate-spin" /> Creating…</> : <>Create Account <ChevronRight size={16} /></>}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-5">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-300 hover:text-white font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  // ── Step 3: Email verification ────────────────────────────────────────────

  async function handleVerify() {
    if (!verifyCode.trim()) { setError("Please enter the verification code."); return; }
    if (!isLoaded || !signUp) { setError("Auth not ready."); return; }

    setLoading(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verifyCode });

      if (result.status !== "complete") {
        setError("Verification failed. Please check the code and try again.");
        setLoading(false);
        return;
      }

      // Activate the Clerk session
      await setActive({ session: result.createdSessionId });

      // Create the CouncilMember record
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          form.name,
          email:         form.email.trim().toLowerCase(),
          phone:         form.phone,
          universityId:  form.universityId,
          section:       form.section,
          role:          form.role,
          batch:         form.batch,
          baptismalName: form.baptismalName,
          bio:           form.bio,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Session active but profile save failed — go to onboarding to retry
        router.push("/onboarding");
        return;
      }

      // Redirect to their personal council section page
      router.push(json.redirectUrl);
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { longMessage?: string; message: string }[] };
      const msg =
        clerkErr?.errors?.[0]?.longMessage ??
        clerkErr?.errors?.[0]?.message ??
        "Verification failed. Please try again.";
      setError(msg);
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <StepDots current={3} total={4} />
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-white font-bold text-lg">Verify your email</h2>
          <p className="text-blue-200/70 text-xs mt-1">
            We sent a 6-digit code to <span className="text-white font-medium">{form.email}</span>
          </p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {error && (
            <div className="text-xs text-red-200 bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2.5">
              ⚠ {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5">Verification Code</label>
            <input
              type="text" value={verifyCode}
              onChange={(e) => { setVerifyCode(e.target.value); setError(null); }}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-3 text-lg font-mono text-white text-center placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent tracking-[0.5em] transition-all"
            />
          </div>

          <button
            type="button" onClick={handleVerify} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 disabled:opacity-60 py-3 rounded-xl text-sm font-bold transition-all shadow-lg"
          >
            {loading
              ? <><Loader2 size={15} className="animate-spin" /> Verifying…</>
              : <><Check size={15} /> Verify & Complete Setup</>
            }
          </button>

          <p className="text-center text-white/30 text-xs">
            Didn&apos;t receive it?{" "}
            <button
              type="button"
              onClick={async () => {
                try {
                  await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
                } catch { /* ignore */ }
              }}
              className="text-blue-300 hover:text-white font-medium transition-colors"
            >
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
