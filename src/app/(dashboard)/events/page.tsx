import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { Church, Plus, Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Events" };

const EVENT_TYPE_LABELS: Record<string, string> = {
  KIDASE: "ቅዳሴ — Kidase",
  TIMKAT: "ጥምቀት — Timkat",
  MESKEL: "መስቀል — Meskel",
  ENKUTATASH: "እንቁጣጣሽ — Enkutatash",
  FASIKA: "ፋሲካ — Fasika",
  GENA: "ገና — Gena",
  TSOME_FILSETA: "ጾመ ፍልሰታ",
  TSOME_NEBIYAT: "ጾመ ነቢያት",
  WEEKLY_MEETING: "Weekly Meeting",
  PRAYER_SESSION: "Prayer Session",
  BIBLE_STUDY: "Bible Study",
  COMMUNITY_SERVICE: "Community Service",
  SPECIAL_EVENT: "Special Event",
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  KIDASE: "bg-blue-50 border-blue-200 text-blue-700",
  TIMKAT: "bg-sky-50 border-sky-200 text-sky-700",
  MESKEL: "bg-amber-50 border-amber-200 text-amber-700",
  FASIKA: "bg-purple-50 border-purple-200 text-purple-700",
  GENA: "bg-indigo-50 border-indigo-200 text-indigo-700",
  WEEKLY_MEETING: "bg-emerald-50 border-emerald-200 text-emerald-700",
  PRAYER_SESSION: "bg-rose-50 border-rose-200 text-rose-700",
  BIBLE_STUDY: "bg-teal-50 border-teal-200 text-teal-700",
  COMMUNITY_SERVICE: "bg-pink-50 border-pink-200 text-pink-700",
  SPECIAL_EVENT: "bg-orange-50 border-orange-200 text-orange-700",
};

interface Event {
  id: string; name: string; type: string;
  description: string | null; eventDate: string;
  location: string | null; isRecurring: boolean;
  attendances: { userId: string; present: boolean }[];
}

export default async function EventsPage() {
  const events = await apiFetch<Event[]>("/api/events").catch(() => [] as Event[]);

  const upcoming = events.filter((e) => new Date(e.eventDate) >= new Date());
  const past     = events.filter((e) => new Date(e.eventDate) <  new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Church size={20} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Events · ዝግጅቶች</h1>
          </div>
          <p className="text-slate-500 text-sm">
            {upcoming.length} upcoming · {past.length} past
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <Plus size={15} /> New Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Events",    value: events.length,    color: "text-blue-700",    bg: "bg-blue-50",    border: "border-blue-200" },
          { label: "Upcoming",        value: upcoming.length,  color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
          { label: "Past Events",     value: past.length,      color: "text-slate-600",   bg: "bg-slate-50",   border: "border-slate-200" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-xl p-4 text-center`}>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming events */}
      {upcoming.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Calendar size={15} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800 text-sm">Upcoming Events</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {upcoming.map((e) => {
              const colorClass = EVENT_TYPE_COLORS[e.type] ?? "bg-slate-50 border-slate-200 text-slate-600";
              const presentCount = e.attendances.filter((a) => a.present).length;
              return (
                <li key={e.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <p className="text-xs font-bold text-blue-700">{new Date(e.eventDate).toLocaleString("default", { month: "short" })}</p>
                    <p className="text-lg font-black text-blue-800 leading-tight">{new Date(e.eventDate).getDate()}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 leading-tight">{e.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${colorClass}`}>
                        {EVENT_TYPE_LABELS[e.type] ?? e.type}
                      </span>
                    </div>
                    {e.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{e.description}</p>}
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      {e.location && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={10} /> {e.location}
                        </span>
                      )}
                      <span className="text-xs text-slate-400">{formatDate(e.eventDate)}</span>
                      {presentCount > 0 && (
                        <span className="text-xs text-emerald-600 font-medium">{presentCount} attended</span>
                      )}
                      {e.isRecurring && (
                        <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full">Recurring</span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Past events */}
      {past.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-sm text-slate-400">Past Events</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {past.slice(0, 10).map((e) => (
              <li key={e.id} className="flex items-center gap-4 px-5 py-3.5 opacity-60 hover:opacity-80 transition-opacity">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 line-through">{e.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatDate(e.eventDate)}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">
                  {e.attendances.filter((a) => a.present).length} attended
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {events.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <Church size={32} className="mx-auto mb-3 text-slate-200" />
          <p className="font-semibold text-slate-500">No events yet</p>
          <p className="text-sm text-slate-400 mt-1">Create Kidase schedules, prayer sessions, Bible study events and more.</p>
        </div>
      )}
    </div>
  );
}
