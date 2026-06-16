// ── Prisma enum mirrors (no Prisma dependency in frontend) ───────────────────

export type Department =
  | "EDUCATION" | "CHOIR" | "FINANCE" | "PUBLIC_RELATIONS"
  | "RESEARCH"  | "CHARITY" | "SUNDAY_SCHOOL" | "MAHIBER";

export type CouncilSection =
  | "MAIN_OFFICE" | "EDUCATION" | "CHOIR" | "FINANCE"
  | "PUBLIC_RELATIONS" | "RESEARCH" | "CHARITY" | "BATCH_COORDINATION";

export type CouncilRole =
  | "SECTION_HEAD" | "DEPUTY_HEAD" | "SECRETARY"
  | "TREASURER" | "COORDINATOR" | "MEMBER";

export type GibiRole = "ADMIN" | "DEPARTMENT_HEAD" | "SECRETARY" | "TREASURER" | "MEMBER";

export type SpiritualTitle = "DEACON" | "SUBDEACON" | "READER" | "ZEMARI" | "NONE";

export type EventType =
  | "KIDASE" | "TIMKAT" | "MESKEL" | "ENKUTATASH" | "FASIKA"
  | "GENA" | "TSOME_FILSETA" | "TSOME_NEBIYAT" | "WEEKLY_MEETING"
  | "PRAYER_SESSION" | "BIBLE_STUDY" | "COMMUNITY_SERVICE" | "SPECIAL_EVENT";

// ── Shared interfaces ────────────────────────────────────────────────────────

export interface MemberWithStats {
  id: string; name: string; email: string; phone: string | null;
  universityId: string; department: Department; batch: string;
  role: GibiRole; spiritualTitle: SpiritualTitle; baptismalName: string | null;
  kebele: string | null; isActive: boolean;
  _count: { attendances: number; payments: number };
}

export interface AnnouncementItem {
  id: string; title: string; body: string;
  isPinned: boolean; publishedAt: Date; expiresAt: Date | null;
}

export interface CouncilMemberRow {
  id: string; name: string; email: string; phone: string | null;
  universityId: string; section: CouncilSection; subSection: string | null;
  role: CouncilRole; batch: string; baptismalName: string | null;
  bio: string | null; photoUrl: string | null; isActive: boolean; joinedAt: Date;
}
