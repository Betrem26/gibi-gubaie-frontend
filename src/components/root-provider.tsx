'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from '@/context/language-context';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/onboarding"
      signUpFallbackRedirectUrl="/onboarding"
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ClerkProvider>
  );
}
