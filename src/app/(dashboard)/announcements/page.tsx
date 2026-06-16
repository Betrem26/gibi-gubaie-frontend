import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import AnnouncementsClient from "@/components/announcements-client";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  const announcements = await apiFetch<object[]>("/api/announcements").catch(() => []);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Announcements · ማስታወቂያዎች</h1>
        <p className="text-slate-500 text-sm mt-0.5">Notices, reminders and updates for all members</p>
      </div>
      <AnnouncementsClient initialAnnouncements={announcements} />
    </div>
  );
}
