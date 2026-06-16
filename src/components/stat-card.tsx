import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "indigo";
}

const styles: Record<NonNullable<StatCardProps["color"]>, {
  bg: string; iconBg: string; iconText: string; value: string; border: string;
}> = {
  blue:   { bg: "bg-white",         iconBg: "bg-blue-100",    iconText: "text-blue-600",    value: "text-blue-700",    border: "border-slate-200" },
  green:  { bg: "bg-white",         iconBg: "bg-emerald-100", iconText: "text-emerald-600", value: "text-emerald-700", border: "border-slate-200" },
  amber:  { bg: "bg-white",         iconBg: "bg-amber-100",   iconText: "text-amber-600",   value: "text-amber-700",   border: "border-slate-200" },
  red:    { bg: "bg-white",         iconBg: "bg-rose-100",    iconText: "text-rose-600",    value: "text-rose-700",    border: "border-slate-200" },
  purple: { bg: "bg-white",         iconBg: "bg-purple-100",  iconText: "text-purple-600",  value: "text-purple-700",  border: "border-slate-200" },
  indigo: { bg: "bg-white",         iconBg: "bg-indigo-100",  iconText: "text-indigo-600",  value: "text-indigo-700",  border: "border-slate-200" },
};

export default function StatCard({ title, value, icon: Icon, sub, color = "blue" }: StatCardProps) {
  const s = styles[color];
  return (
    <div className={`${s.bg} rounded-xl border ${s.border} shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow`}>
      <div className={`${s.iconBg} ${s.iconText} p-3 rounded-xl shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider leading-none">{title}</p>
        <p className={`text-2xl font-bold mt-1.5 leading-none ${s.value}`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1.5">{sub}</p>}
      </div>
    </div>
  );
}
