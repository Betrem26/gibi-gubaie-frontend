/**
 * council.ts — server-side enriched metadata (includes React icon components).
 * Import this only in Server Components and server-only files.
 * For client components, import from @/lib/council-data instead.
 */
import type { ComponentType } from "react";
import { CouncilSection } from "../types/index";
import {
  Building2, BookOpen, Music, DollarSign,
  Megaphone, FlaskConical, Heart, CalendarClock,
} from "lucide-react";

export {
  SECTION_DATA,
  ALL_SECTION_DATA,
  ROLE_LABELS,
  ROLE_STYLES,
  SLUG_TO_SECTION,
  SECTION_TO_SLUG,
  SECTION_SUB_SECTIONS,
  type SectionData,
  type SubSectionDef,
} from "@/lib/council-data";

export interface SectionMeta {
  key:         CouncilSection;
  label:       string;
  amharic:     string;
  description: string;
  href:        string;
  color:       string;
  textColor:   string;
  bgColor:     string;
  borderColor: string;
  icon:        ComponentType<{ size?: number; className?: string }>;
}

export const SECTION_META: Record<CouncilSection, SectionMeta> = {
  MAIN_OFFICE: {
    key: "MAIN_OFFICE", label: "Main Office", amharic: "ዋና ጽ/ቤት",
    description: "Central administration overseeing all 7 council sections",
    href: "/council/main-office",
    color: "bg-blue-600", textColor: "text-blue-700", bgColor: "bg-blue-50", borderColor: "border-blue-200",
    icon: Building2,
  },
  EDUCATION: {
    key: "EDUCATION", label: "Education", amharic: "ትምህርት ክፍል",
    description: "Academic programs, Bible study, teacher assignment & course follow-up",
    href: "/council/education",
    color: "bg-sky-500", textColor: "text-sky-700", bgColor: "bg-sky-50", borderColor: "border-sky-200",
    icon: BookOpen,
  },
  CHOIR: {
    key: "CHOIR", label: "Choir & Fine Arts", amharic: "ዘማሪ እና ኪነ ጥበብ ክፍል",
    description: "Liturgical music, fine arts, visual arts, training & planning",
    href: "/council/choir",
    color: "bg-purple-500", textColor: "text-purple-700", bgColor: "bg-purple-50", borderColor: "border-purple-200",
    icon: Music,
  },
  FINANCE: {
    key: "FINANCE", label: "Development", amharic: "ልማት ክፍል",
    description: "Revenue collection, property, media, project design & publications",
    href: "/council/finance",
    color: "bg-emerald-500", textColor: "text-emerald-700", bgColor: "bg-emerald-50", borderColor: "border-emerald-200",
    icon: DollarSign,
  },
  PUBLIC_RELATIONS: {
    key: "PUBLIC_RELATIONS", label: "Public Relations", amharic: "ህዝብ ግንኙነት ክፍል",
    description: "Communications, outreach & community engagement",
    href: "/council/public-relations",
    color: "bg-amber-500", textColor: "text-amber-700", bgColor: "bg-amber-50", borderColor: "border-amber-200",
    icon: Megaphone,
  },
  RESEARCH: {
    key: "RESEARCH", label: "አባላት እንክብካቤ", amharic: "አባላት እንክብካቤ ክፍል",
    description: "Member registration, department assignments & member welfare",
    href: "/council/research",
    color: "bg-rose-500", textColor: "text-rose-700", bgColor: "bg-rose-50", borderColor: "border-rose-200",
    icon: FlaskConical,
  },
  CHARITY: {
    key: "CHARITY", label: "Charity (Mitswa)", amharic: "ምጽዋት ክፍል",
    description: "Charitable activities & community service",
    href: "/council/charity",
    color: "bg-pink-500", textColor: "text-pink-700", bgColor: "bg-pink-50", borderColor: "border-pink-200",
    icon: Heart,
  },
  BATCH_COORDINATION: {
    key: "BATCH_COORDINATION", label: "Batch & Coordination", amharic: "ባች እና ማስተባበሪያ ክፍል",
    description: "Announcements, program preparation, travel, committees & member affairs",
    href: "/council/batch-coordination",
    color: "bg-indigo-500", textColor: "text-indigo-700", bgColor: "bg-indigo-50", borderColor: "border-indigo-200",
    icon: CalendarClock,
  },
};

export const ALL_SECTIONS = Object.values(SECTION_META);
