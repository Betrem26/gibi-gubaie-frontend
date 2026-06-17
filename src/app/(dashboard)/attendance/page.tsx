import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import AttendanceClientPage from "@/components/attendance-client-page";
import type { Department } from "@/types/index";

export const metadata: Metadata = { title: "Attendance" };
export const dynamic = "force-dynamic";

type MemberSummary = {
  id: string;
  name: string;
  universityId: string;
  department: Department;
  isActive: boolean;
};

export default async function AttendancePage() {
  const today     = new Date().toISOString().split("T")[0];
  const eventName = "Weekly Meeting";

  const [allMembers, attendance] = await Promise.all([
    apiFetch<MemberSummary[]>("/api/members").catch(() => [] as MemberSummary[]),
    apiFetch<{ presentIds: string[] }>(`/api/attendance?eventName=${encodeURIComponent(eventName)}&eventDate=${today}`).catch(() => ({ presentIds: [] })),
  ]);

  const members = allMembers.filter((m) => m.isActive !== false);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {new Date(today).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          {" · "}{members.length} active members
        </p>
      </div>
      <AttendanceClientPage
        members={members}
        initialEventName={eventName}
        initialEventDate={today}
        initialPresent={attendance.presentIds}
      />
    </div>
  );
}
