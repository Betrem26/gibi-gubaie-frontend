import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Wallet, Clock } from "lucide-react";
import FinanceClientPage from "@/components/finance-client-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Finance" };

export default async function FinancePage() {
  const [financeData, members] = await Promise.all([
    apiFetch<{ payments: { isPaid: boolean; amount: number; [k: string]: unknown }[]; expenses: { amount: number; [k: string]: unknown }[] }>("/api/finance").catch(() => ({ payments: [], expenses: [] })),
    apiFetch<object[]>("/api/members").catch(() => []),
  ]);

  const { payments, expenses } = financeData;
  const totalCollected = payments.filter((p) => p.isPaid).reduce((s, p) => s + p.amount, 0);
  const totalExpenses  = expenses.reduce((s, e) => s + e.amount, 0);
  const balance        = totalCollected - totalExpenses;
  const pendingCount   = payments.filter((p) => !p.isPaid).length;

  const summaryCards = [
    { label: "Total Collected",  value: formatCurrency(totalCollected), icon: TrendingUp,  bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", iconBg: "bg-emerald-100", iconText: "text-emerald-600" },
    { label: "Total Expenses",   value: formatCurrency(totalExpenses),  icon: TrendingDown, bg: "bg-rose-50",    border: "border-rose-200",    text: "text-rose-700",    iconBg: "bg-rose-100",    iconText: "text-rose-600" },
    { label: "Balance",          value: formatCurrency(balance),        icon: Wallet, bg: balance >= 0 ? "bg-blue-50" : "bg-orange-50", border: balance >= 0 ? "border-blue-200" : "border-orange-200", text: balance >= 0 ? "text-blue-700" : "text-orange-700", iconBg: balance >= 0 ? "bg-blue-100" : "bg-orange-100", iconText: balance >= 0 ? "text-blue-600" : "text-orange-600" },
    { label: "Pending Payments", value: pendingCount,                   icon: Clock,  bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  iconBg: "bg-amber-100",  iconText: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Finance</h1>
        <p className="text-slate-500 text-sm mt-0.5">Track monthly contributions and expenses</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, icon: Icon, bg, border, text, iconBg, iconText }) => (
          <div key={label} className={`rounded-xl border p-4 ${bg} ${border} hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
              <div className={`${iconBg} ${iconText} p-2 rounded-lg`}><Icon size={16} /></div>
            </div>
            <p className={`text-2xl font-black ${text}`}>{value}</p>
          </div>
        ))}
      </div>
      <FinanceClientPage payments={payments as never} expenses={expenses as never} members={members as never} />
    </div>
  );
}
