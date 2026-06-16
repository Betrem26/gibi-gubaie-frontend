import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SECTION_TO_SLUG } from "@/lib/council-data";
import { CouncilSection } from "@/types/index";
import OnboardingForm from "@/components/onboarding-form";

export const metadata: Metadata = { title: "Welcome · Set Up Your Profile" };
export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const meta = user?.publicMetadata as {
    onboardingDone?: boolean;
    councilSection?: CouncilSection;
    councilMemberId?: string;
  } | undefined;

  // Already onboarded — redirect to their section page
  if (meta?.onboardingDone && meta.councilSection && meta.councilMemberId) {
    redirect(`/council/${SECTION_TO_SLUG[meta.councilSection]}/${meta.councilMemberId}`);
  }

  const defaultName  = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const defaultEmail = user?.emailAddresses?.[0]?.emailAddress ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 shadow-xl shadow-blue-500/30 mb-4">
            <span className="text-white font-black text-xl tracking-tighter">GG</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome to Gibi Gubaie</h1>
          <p className="text-slate-500 text-sm mt-1.5">
            ጊቢ ጉባኤ · Complete your profile to join your council section
          </p>
        </div>
        <OnboardingForm defaultName={defaultName} defaultEmail={defaultEmail} />
      </div>
    </div>
  );
}
