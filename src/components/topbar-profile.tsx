"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import LanguageSwitcher from "./language-switcher";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CouncilSection } from "@/types/index";
import { SECTION_DATA, SECTION_TO_SLUG } from "@/lib/council-data";

export default function TopBarProfile() {
  const { user, isLoaded } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until client is mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-4 shrink-0">
        <LanguageSwitcher />
        <div className="w-9 h-9 rounded-full bg-slate-200 animate-pulse" />
      </div>
    );
  }

  const meta = user?.publicMetadata as {
    onboardingDone?: boolean;
    councilSection?: CouncilSection;
    councilMemberId?: string;
    councilRole?: string;
  } | undefined;

  const sectionMeta = meta?.councilSection ? SECTION_DATA[meta.councilSection] : null;
  const profileHref = meta?.councilSection && meta?.councilMemberId
    ? `/council/${SECTION_TO_SLUG[meta.councilSection]}/${meta.councilMemberId}`
    : null;

  return (
    <div className="flex items-center gap-4 shrink-0">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Name + section pill */}
      {isLoaded && user && (
        <div className="hidden sm:flex flex-col items-end gap-0.5">
          <span className="text-sm font-semibold text-slate-800 leading-tight">
            {user.firstName ?? user.emailAddresses[0]?.emailAddress}
          </span>
          {sectionMeta ? (
            profileHref ? (
              <Link
                href={profileHref}
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${sectionMeta.bgColor} ${sectionMeta.textColor} border ${sectionMeta.borderColor} hover:opacity-80 transition-opacity leading-tight`}
              >
                {sectionMeta.label}
              </Link>
            ) : (
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${sectionMeta.bgColor} ${sectionMeta.textColor} border ${sectionMeta.borderColor} leading-tight`}>
                {sectionMeta.label}
              </span>
            )
          ) : (
            <span className="text-[10px] text-slate-400 font-medium leading-tight">
              {meta?.councilRole ?? "Member"}
            </span>
          )}
        </div>
      )}

      {/* Clerk UserButton — opens profile/sign-out modal */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-9 h-9 ring-2 ring-blue-100 hover:ring-blue-300 transition-all",
            userButtonPopoverCard: "shadow-2xl border border-slate-200",
          },
        }}
        userProfileMode="modal"
      />
    </div>
  );
}
