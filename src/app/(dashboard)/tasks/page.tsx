import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import { ClipboardList, Plus, CheckCircle2, Circle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Tasks" };

interface Task {
  id: string; title: string; description: string | null;
  dueDate: string | null; isCompleted: boolean; department: string | null;
  assignments: { user: { name: string } }[];
}

export default async function TasksPage() {
  const tasks = await apiFetch<Task[]>("/api/tasks").catch(() => []);
  const open      = tasks.filter((t) => !t.isCompleted);
  const completed = tasks.filter((t) => t.isCompleted);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tasks · ተግባራት</h1>
          <p className="text-slate-500 text-sm mt-0.5">Assign and track responsibilities across departments</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
          <Plus size={15} /> New Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-blue-700">{open.length}</p>
          <p className="text-xs font-semibold text-blue-600 mt-0.5">Open Tasks</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-black text-emerald-700">{completed.length}</p>
          <p className="text-xs font-semibold text-emerald-600 mt-0.5">Completed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          <ClipboardList size={15} className="text-slate-400" />
          <h2 className="font-bold text-slate-800 text-sm">All Tasks</h2>
        </div>
        {tasks.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-400">
            <ClipboardList size={28} className="mx-auto mb-2 text-slate-200" />
            <p className="text-sm font-medium">No tasks yet</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {tasks.map((t) => (
              <li key={t.id} className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${t.isCompleted ? "opacity-60" : ""}`}>
                {t.isCompleted ? <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" /> : <Circle size={18} className="text-slate-300 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${t.isCompleted ? "line-through text-slate-400" : "text-slate-900"}`}>{t.title}</p>
                  {t.description && <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>}
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {t.dueDate && <span className="text-xs text-slate-400">Due: {formatDate(t.dueDate)}</span>}
                    {t.assignments.length > 0 && <span className="text-xs text-blue-600 font-medium">→ {t.assignments.map((a) => a.user.name).join(", ")}</span>}
                    {t.department && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{t.department.replace("_", " ")}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
