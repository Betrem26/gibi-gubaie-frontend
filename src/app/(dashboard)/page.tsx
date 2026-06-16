import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { SECTION_TO_SLUG } from "@/lib/council-data";
import { CouncilSection } from "@/types/index";
import DashboardClient from "./dashboard-client";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

interface Stats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalCollected: number;
  totalExpenses: number;
  balance: number;
  attendanceRate: number;
}

export default async function DashboardPage() {
  const { userId } = await auth();

  // If signed-in user has a council record, redirect them to their section page
  if (userId) {
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress;
    if (email) {
      try {
        const members = await apiFetch<{ id: string; section: CouncilSection; email: string }[]>("/api/council");
        const found = members.find((m) => m.email === email);
        if (found) redirect(`/council/${SECTION_TO_SLUG[found.section]}/${found.id}`);
      } catch { /* no council record — show regular dashboard */ }
    }
  }

  let stats: Stats = {
    totalMembers: 0, activeMembers: 0, inactiveMembers: 0,
    totalCollected: 0, totalExpenses: 0, balance: 0, attendanceRate: 0,
  };

  try {
    // Build stats from members + finance data
    const [members, financeData, attendance] = await Promise.all([
      apiFetch<{ isActive: boolean }[]>("/api/members"),
      apiFetch<{ payments: { isPaid: boolean; amount: number }[]; expenses: { amount: number }[] }>("/api/finance"),
      apiFetch<{ presentIds: string[] }>(`/api/attendance?eventName=Weekly%20Meeting&eventDate=${new Date().toISOString().split("T")[0]}`).catch(() => ({ presentIds: [] })),
    ]);

    const totalMembers   = members.length;
    const activeMembers  = members.filter((m) => m.isActive).length;
    const totalCollected = financeData.payments.filter((p) => p.isPaid).reduce((s, p) => s + p.amount, 0);
    const totalExpenses  = financeData.expenses.reduce((s, e) => s + e.amount, 0);

    stats = {
      totalMembers,
      activeMembers,
      inactiveMembers: totalMembers - activeMembers,
      totalCollected,
      totalExpenses,
      balance: totalCollected - totalExpenses,
      attendanceRate: totalMembers > 0 ? Math.round((attendance.presentIds.length / totalMembers) * 100) : 0,
    };
  } catch { /* use zero stats as fallback */ }

  return (
    <DashboardClient
      totalMembers={stats.totalMembers}
      activeMembers={stats.activeMembers}
      inactiveMembers={stats.inactiveMembers}
      totalCollected={stats.totalCollected}
      totalExpenses={stats.totalExpenses}
      balance={stats.balance}
      attendanceRate={stats.attendanceRate}
    />
  );
}
