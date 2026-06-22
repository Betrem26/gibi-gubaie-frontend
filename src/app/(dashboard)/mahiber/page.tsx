import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { Users2, HandHeart, Bell } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { AnnouncementItem } from "@/types/index";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Mahiber · ማህበር" };

export default async function MahiberPage() {
  const announcements = await apiFetch<AnnouncementItem[]>("/api/announcements")
    .catch(() => [] as AnnouncementItem[]);

  const recent = announcements.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center">
          <Users2 size={22} className="text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mahiber · ማህበር</h1>
          <p className="text-slate-500 text-sm">Fellowship group — ኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተ ክርስቲያን</p>
        </div>
      </div>

      {/* About section */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <HandHeart size={20} className="text-teal-600 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-bold text-teal-900 mb-1">About Mahiber</h2>
            <p className="text-sm text-teal-800 leading-relaxed">
              ማህበር (Mahiber) is a traditional Ethiopian Orthodox fellowship group where members
              gather monthly to celebrate the feast of their patron saint, share meals, pray together,
              and support one another spiritually and materially.
            </p>
            <p className="text-sm text-teal-700 mt-2 leading-relaxed">
              Members rotate hosting duties and contribute to the group's charitable activities,
              strengthening the bonds of faith and community within the association.
            </p>
          </div>
        </div>
      </div>

      {/* Recent announcements */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Bell size={15} className="text-teal-500" />
          <h2 className="font-bold text-slate-800 text-sm">Recent Announcements</h2>
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-400">
            <Bell size={28} className="mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-medium">No announcements yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {recent.map((a) => (
              <li key={a.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.body}</p>
                <p className="text-xs text-slate-400 mt-1.5">{formatDate(a.publishedAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
