import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { HandHeart, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Prayer Board" };

interface PrayerRequest {
  id: string; title: string; description: string;
  isAnonymous: boolean; isResolved: boolean; createdAt: string;
  user: { name: string; department: string };
}

export default async function PrayerPage() {
  const requests = await apiFetch<PrayerRequest[]>("/api/prayer-requests").catch(() => []);
  const open     = requests.filter((r) => !r.isResolved);
  const resolved = requests.filter((r) => r.isResolved);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prayer Board · የጸሎት ሰሌዳ</h1>
          <p className="text-slate-500 text-sm mt-0.5">Intercession requests from members — ለወንድሞቻችን ጸሎት</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <Plus size={15} /> Add Request
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-blue-700">{open.length}</p>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">Open Requests</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-emerald-700">{resolved.length}</p>
          <p className="text-xs font-semibold text-emerald-600 mt-0.5">Answered Prayers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <HandHeart size={15} className="text-blue-500" />
          <h2 className="font-bold text-slate-800 text-sm">Open Prayer Requests</h2>
        </div>
        {open.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-400">
            <HandHeart size={28} className="mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-medium">No open prayer requests</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {open.map((r) => (
              <li key={r.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{r.description}</p>
                    <p className="text-xs text-slate-400 mt-1.5">
                      {r.isAnonymous ? "Anonymous" : r.user?.name} · {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-semibold">Open</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
