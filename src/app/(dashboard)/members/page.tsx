import type { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import AddMemberForm from "@/components/add-member-form";
import MembersClientPage from "@/components/members-client-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Members" };

export default async function MembersPage() {
  const members = await apiFetch<object[]>("/api/members").catch(() => []) as {
    isActive: boolean; [k: string]: unknown
  }[];

  const active  = members.filter((m) => m.isActive).length;
  const pending = members.length - active;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Members</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {members.length} registered ·{" "}
            <span className="text-emerald-600 font-semibold">{active} active</span>
            {" · "}
            <span className="text-amber-600 font-semibold">{pending} pending</span>
          </p>
        </div>
        <AddMemberForm />
      </div>
      <MembersClientPage members={members as never} />
    </div>
  );
}
