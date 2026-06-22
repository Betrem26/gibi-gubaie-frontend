"use client";

import { useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, PlusCircle, Receipt } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useApiFetch } from "@/lib/client-fetch";

type Member  = { id: string; name: string; universityId: string };
type Payment = { id: string; amount: number; month: string; isPaid: boolean; note: string | null; user: { name: string; universityId: string } };
type Expense = { id: string; title: string; amount: number; date: Date | string; description: string | null };
type FormType = "payment" | "expense" | null;

const INPUT = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent";
const INPUT_RED = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent";

export default function FinanceClientPage({
  payments, expenses, members,
}: {
  payments: Payment[];
  expenses: Expense[];
  members: Member[];
}) {
  const apiFetch  = useApiFetch();
  const [tab, setTab]             = useState<"payments" | "expenses">("payments");
  const [form, setForm]           = useState<FormType>(null);
  const [saving, setSaving]       = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openForm(type: "payment" | "expense") {
    setForm(form === type ? null : type);
    setFormError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await apiFetch("/api/finance", {
        method: "POST",
        body: JSON.stringify({ ...data, type: form }),
      });
      setSaving(false);
      setForm(null);
      window.location.reload();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Network error — please check your connection.");
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
      {/* Record form */}
      <div className="xl:col-span-1">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 sticky top-24">
          <div className="flex items-center gap-2">
            <Receipt size={16} className="text-slate-400" />
            <h2 className="font-bold text-slate-800">Record Transaction</h2>
          </div>

          {/* Type selector */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openForm("payment")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                form === "payment" ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <ArrowDownCircle size={15} /> Payment
            </button>
            <button
              onClick={() => openForm("expense")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                form === "expense" ? "bg-rose-600 text-white border-rose-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <ArrowUpCircle size={15} /> Expense
            </button>
          </div>

          {/* Payment form */}
          {form === "payment" && (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {formError && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {formError}</p>}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Member</label>
                <select name="userId" required className={INPUT + " bg-white"}>
                  <option value="">Select member…</option>
                  {members.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.universityId})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Month</label>
                  <input name="month" type="month" required className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Amount (ETB)</label>
                  <input name="amount" type="number" min="1" step="0.01" required placeholder="0.00" className={INPUT} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Note (optional)</label>
                <input name="note" type="text" placeholder="e.g. January contribution" className={INPUT} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setForm(null)} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                  {saving ? "Saving…" : "Record Payment"}
                </button>
              </div>
            </form>
          )}

          {/* Expense form */}
          {form === "expense" && (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {formError && <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">⚠ {formError}</p>}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title</label>
                <input name="title" type="text" required placeholder="e.g. Event supplies" className={INPUT_RED} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date</label>
                  <input name="date" type="date" required className={INPUT_RED} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Amount (ETB)</label>
                  <input name="amount" type="number" min="1" step="0.01" required placeholder="0.00" className={INPUT_RED} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description (optional)</label>
                <input name="description" type="text" placeholder="Details…" className={INPUT_RED} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="button" onClick={() => setForm(null)} className="flex-1 border border-slate-200 text-slate-600 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                  {saving ? "Saving…" : "Record Expense"}
                </button>
              </div>
            </form>
          )}

          {form === null && (
            <p className="text-xs text-slate-400 text-center py-3 border border-dashed border-slate-200 rounded-lg">
              Select a transaction type above to begin.
            </p>
          )}
        </div>
      </div>

      {/* Ledger */}
      <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          {(["payments", "expenses"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${
                tab === t ? "bg-white border-b-2 border-blue-600 text-blue-700" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${tab === t ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
                {t === "payments" ? payments.length : expenses.length}
              </span>
            </button>
          ))}
        </div>

        <div className="divide-y divide-slate-50 max-h-[560px] overflow-y-auto scrollbar-thin">
          {tab === "payments" && payments.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <ArrowDownCircle size={17} className="text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{p.user.name}</p>
                <p className="text-xs text-slate-400">{p.month} · {p.user.universityId}{p.note ? ` · ${p.note}` : ""}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600">{formatCurrency(p.amount)}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {p.isPaid ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          ))}

          {tab === "expenses" && expenses.map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                <ArrowUpCircle size={17} className="text-rose-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{e.title}</p>
                <p className="text-xs text-slate-400">{formatDate(e.date)}{e.description ? ` · ${e.description}` : ""}</p>
              </div>
              <p className="text-sm font-bold text-rose-500 shrink-0">{formatCurrency(e.amount)}</p>
            </div>
          ))}

          {((tab === "payments" && payments.length === 0) || (tab === "expenses" && expenses.length === 0)) && (
            <div className="text-center py-16 text-slate-400">
              <PlusCircle size={28} className="mx-auto mb-2 text-slate-200" />
              <p className="text-sm font-medium text-slate-500">No {tab} recorded yet</p>
              <p className="text-xs mt-1">Use the form on the left to add one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
