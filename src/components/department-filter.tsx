'use client';

import { Department } from '@/types/index';
import { useLanguage } from '@/context/language-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, Music, DollarSign, Megaphone, Beaker, Heart, BookMarked, Users } from 'lucide-react';

const DEPARTMENTS: { value: Department; icon: React.ReactNode; labelKey: keyof typeof import('@/lib/i18n').translations.am }[] = [
  { value: 'EDUCATION', icon: <BookOpen size={20} />, labelKey: 'education' },
  { value: 'CHOIR', icon: <Music size={20} />, labelKey: 'choir' },
  { value: 'FINANCE', icon: <DollarSign size={20} />, labelKey: 'finance_dept' },
  { value: 'PUBLIC_RELATIONS', icon: <Megaphone size={20} />, labelKey: 'publicRelations' },
  { value: 'RESEARCH', icon: <Beaker size={20} />, labelKey: 'research' },
  { value: 'CHARITY', icon: <Heart size={20} />, labelKey: 'charity' },
  { value: 'SUNDAY_SCHOOL', icon: <BookMarked size={20} />, labelKey: 'sundaySchool' },
  { value: 'MAHIBER', icon: <Users size={20} />, labelKey: 'mahiber_dept' },
];

const DEPT_COLORS: Record<Department, string> = {
  EDUCATION: 'bg-sky-50 border-sky-200 hover:bg-sky-100 text-sky-700',
  CHOIR: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
  FINANCE: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 text-emerald-700',
  PUBLIC_RELATIONS: 'bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-700',
  RESEARCH: 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-700',
  CHARITY: 'bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-700',
  SUNDAY_SCHOOL: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700',
  MAHIBER: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
};

export default function DepartmentFilter() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDept = searchParams.get('department') as Department | null;

  const handleDepartmentClick = (dept: Department) => {
    const params = new URLSearchParams(searchParams);
    if (selectedDept === dept) {
      params.delete('department');
    } else {
      params.set('department', dept);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t('department')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DEPARTMENTS.map(({ value, icon, labelKey }) => (
          <button
            key={value}
            onClick={() => handleDepartmentClick(value)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selectedDept === value
                ? `${DEPT_COLORS[value]} border-current shadow-md scale-105`
                : `${DEPT_COLORS[value]} border-transparent`
            }`}
          >
            <div className="text-2xl">{icon}</div>
            <div className="text-left">
              <p className="font-semibold text-sm">{t(labelKey)}</p>
              <p className="text-xs opacity-75">{selectedDept === value ? '✓ Selected' : 'Click to filter'}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
