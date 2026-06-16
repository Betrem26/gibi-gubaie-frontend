"use client";

import { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

type Payment = {
  id: string; amount: number; month: string; isPaid: boolean;
  paidAt: Date | null; note: string | null;
  user: { name: string; universityId: string };
};

type Expense = {
  id: string; title: string; amount: number; date: Date; description: string | null;
};

export default function FinanceLedger({ payments, expenses }: { payments: Payment[]; expenses: Expense[] }) {
  const [tab, setTab] = useState<"payments" | "expenses">("payments");

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        {(["payments", "expenses"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-all ${
              tab === t
                ? "bg-white border-b-2 border-blue-600 text-blue-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t}
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              tab === t ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
            }`}>
              {t === "payments" ? payments.length : expenses.length}
            </span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-slate-50">
        {tab === "payments" && payments.map((p) => (
          <div key={p.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <ArrowDownCircle size={18} className="text-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{p.user.name}</p>
              <p className="text-xs text-slate-400">{p.month} · {p.user.universityId}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-emerald-600">{formatCurrency(p.amount)}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                p.isPaid ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
              }`}>
                {p.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>
        ))}

        {tab === "expenses" && expenses.map((e) => (
          <div key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
              <ArrowUpCircle size={18} className="text-rose-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{e.title}</p>
              <p className="text-xs text-slate-400">{formatDate(e.date)}</p>
            </div>
            <p className="text-sm font-bold text-rose-500 shrink-0">{formatCurrency(e.amount)}</p>
          </div>
        ))}

        {((tab === "payments" && payments.length === 0) || (tab === "expenses" && expenses.length === 0)) && (
          <div className="text-center py-16 text-slate-400">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
              {tab === "payments"
                ? <ArrowDownCircle size={20} className="text-slate-300" />
                : <ArrowUpCircle size={20} className="text-slate-300" />}
            </div>
            <p className="font-medium text-sm">No {tab} recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
