import type { Metadata } from "next";
import RootProvider from "@/components/root-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Gibi Gubaie", template: "%s · Gibi Gubaie" },
  description: "University Spiritual Association Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
