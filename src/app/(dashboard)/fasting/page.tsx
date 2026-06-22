import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { Flame, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Fasting · ጾም" };

const FASTING_TYPES = ["TSOME_FILSETA", "TSOME_NEBIYAT"];
const FASTING_LABELS: Record<string, string> = {
  TSOME_FILSETA: "ጾመ ፍልሰታ — Fast of the Assumption",
  TSOME_NEBIYAT: "ጾመ ነቢያት — Advent Fast",
};

interface Event {
  id: string; name: string; type: string;
  description: string | null; eventDate: string;
  location: string | null;
}

export default async function FastingPage() {
  const allEvents = await apiFetch<Event[]>("/api/events").catch(() => [] as Event[]);
  const fasting   = allEvents.filter((e) => FASTING_TYPES.includes(e.type));
  const upcoming  = fasting.filter((e) => new Date(e.eventDate) >= new Date());

  // Ethiopian Orthodox major fasting periods (static info)
  const fastingPeriods = [
    { name: "ጾመ ነቢያት",    nameEn: "Fast of the Prophets (Advent)",      days: "43 days", months: "Nov – Jan",  color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
    { name: "ጾመ ጌና",      nameEn: "Christmas Fast",                     days: "Varies",  months: "December",   color: "bg-blue-50 border-blue-200 text-blue-700" },
    { name: "ጾመ ጥምቀት",    nameEn: "Epiphany Fast",                      days: "2 days",  months: "January",    color: "bg-sky-50 border-sky-200 text-sky-700" },
    { name: "ዐቢይ ጾም",     nameEn: "Great Lent (Hudadi)",                days: "55 days", months: "Feb – Apr",  color: "bg-purple-50 border-purple-200 text-purple-700" },
    { name: "ጾመ ሐዋርያት",   nameEn: "Fast of the Apostles",               days: "Varies",  months: "Jun – Jul",  color: "bg-rose-50 border-rose-200 text-rose-700" },
    { name: "ጾመ ፍልሰታ",    nameEn: "Fast of the Assumption of Mary",      days: "15 days", months: "August",     color: "bg-amber-50 border-amber-200 text-amber-700" },
    { name: "ረቡዕ እና ዓርብ", nameEn: "Wednesday & Friday weekly fasts",    days: "Weekly",  months: "Year-round", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center">
          <Flame size={22} className="text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fasting Calendar · ጾም</h1>
          <p className="text-slate-500 text-sm">Ethiopian Orthodox Tewahedo fasting periods</p>
        </div>
      </div>

      {/* Fasting periods reference */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-800 text-sm">Major Fasting Periods · ዋና ዋና የጾም ጊዜዎች</h2>
          <p className="text-xs text-slate-400 mt-0.5">Ethiopian Orthodox Tewahedo Church fasting calendar</p>
        </div>
        <div className="divide-y divide-slate-50">
          {fastingPeriods.map((f) => (
            <div key={f.name} className="flex items-center gap-4 px-5 py-3.5">
              <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold border shrink-0 ${f.color}`}>
                {f.days}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{f.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{f.nameEn}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">{f.months}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled fasting events */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <Calendar size={15} className="text-amber-500" />
          <h2 className="font-bold text-slate-800 text-sm">Scheduled Fasting Events</h2>
          <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{upcoming.length} upcoming</span>
        </div>
        {fasting.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-400">
            <Flame size={28} className="mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-medium">No fasting events scheduled</p>
            <p className="text-xs mt-1">Add fasting events from the Events page</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {fasting.map((e) => (
              <li key={e.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{e.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {FASTING_LABELS[e.type] ?? e.type} · {formatDate(e.eventDate)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
