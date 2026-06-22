import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { Church, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Kidase · ቅዳሴ" };

interface Event {
  id: string; name: string; type: string;
  description: string | null; eventDate: string;
  location: string | null; isRecurring: boolean;
}

export default async function KidasePage() {
  const allEvents = await apiFetch<Event[]>("/api/events").catch(() => [] as Event[]);
  const kidase    = allEvents.filter((e) => e.type === "KIDASE");
  const upcoming  = kidase.filter((e) => new Date(e.eventDate) >= new Date());
  const past      = kidase.filter((e) => new Date(e.eventDate) <  new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Church size={22} className="text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kidase · ቅዳሴ</h1>
          <p className="text-slate-500 text-sm">Divine Liturgy schedule — {upcoming.length} upcoming</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-blue-700">{upcoming.length}</p>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">Upcoming Kidase</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-slate-600">{past.length}</p>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">Past Kidase</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Calendar size={15} className="text-blue-500" />
          <h2 className="font-bold text-slate-800 text-sm">Kidase Schedule</h2>
        </div>
        {kidase.length === 0 ? (
          <div className="px-5 py-12 text-center text-slate-400">
            <Church size={28} className="mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-medium">No Kidase events scheduled yet</p>
            <p className="text-xs mt-1">Add events from the Events page</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {kidase.map((e) => {
              const isPast = new Date(e.eventDate) < new Date();
              return (
                <li key={e.id} className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-slate-50 ${isPast ? "opacity-50" : ""}`}>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <p className="text-[10px] font-bold text-blue-600">{new Date(e.eventDate).toLocaleString("default", { month: "short" }).toUpperCase()}</p>
                    <p className="text-lg font-black text-blue-800 leading-tight">{new Date(e.eventDate).getDate()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold leading-tight ${isPast ? "line-through text-slate-500" : "text-slate-900"}`}>{e.name}</p>
                    {e.description && <p className="text-xs text-slate-500 mt-0.5">{e.description}</p>}
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-slate-400">{formatDate(e.eventDate)}</span>
                      {e.location && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={10} /> {e.location}
                        </span>
                      )}
                      {e.isRecurring && (
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Recurring</span>
                      )}
                    </div>
                  </div>
                  {!isPast && (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 px-2 py-1 rounded-full shrink-0">Upcoming</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
