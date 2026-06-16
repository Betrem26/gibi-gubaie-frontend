'use client';

import { Department } from '@/types/index';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, Music, DollarSign, Megaphone, Beaker, Heart, BookMarked, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

// Translation keys for departments
const DEPT_LABELS: Record<Department, { en: string; am: string; om: string; ti: string }> = {
  EDUCATION: { en: 'Education', am: 'ትምህርት', om: 'Barnoota', ti: 'ትምህርቲ' },
  CHOIR: { en: 'Choir', am: 'ዘማሪ', om: 'Faaruu', ti: 'ዘማሪ' },
  FINANCE: { en: 'Finance', am: 'ፋይናንስ', om: 'Raajii', ti: 'ገንዘብ' },
  PUBLIC_RELATIONS: { en: 'Public Relations', am: 'ህዝብ ግንኙነት', om: 'Walqabsiisa Hawaasa', ti: 'ህዝባዊ ምስጋር' },
  RESEARCH: { en: 'Research', am: 'ምርምር', om: 'Qorannaa', ti: 'ምርምር' },
  CHARITY: { en: 'Charity', am: 'ምጽዋት', om: 'Midhaa', ti: 'ሓበሬታ' },
  SUNDAY_SCHOOL: { en: 'Sunday School', am: 'የሰንበት ትምህርት ቤት', om: 'Barnoota Galgala', ti: 'ሰንበት ትምህርቲ' },
  MAHIBER: { en: 'Mahiber', am: 'ማህበር', om: 'Mahiber', ti: 'ማህበር' },
};

const DEPT_COLORS: Record<Department, { bg: string; border: string; text: string; hover: string }> = {
  EDUCATION: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', hover: 'hover:bg-sky-100' },
  CHOIR: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
  FINANCE: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', hover: 'hover:bg-emerald-100' },
  PUBLIC_RELATIONS: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', hover: 'hover:bg-amber-100' },
  RESEARCH: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', hover: 'hover:bg-rose-100' },
  CHARITY: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', hover: 'hover:bg-pink-100' },
  SUNDAY_SCHOOL: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', hover: 'hover:bg-indigo-100' },
  MAHIBER: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', hover: 'hover:bg-teal-100' },
};

export default function DashboardDepartments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDept = searchParams.get('department') as Department | null;
  const [hoveredDept, setHoveredDept] = useState<Department | null>(null);
  const [language, setLanguage] = useState<'en' | 'am' | 'om' | 'ti'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load language from localStorage
    const saved = localStorage.getItem('language') as 'en' | 'am' | 'om' | 'ti' | null;
    if (saved) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const DEPARTMENTS: { value: Department; icon: React.ReactNode }[] = [
    { value: 'EDUCATION', icon: <BookOpen size={24} /> },
    { value: 'CHOIR', icon: <Music size={24} /> },
    { value: 'FINANCE', icon: <DollarSign size={24} /> },
    { value: 'PUBLIC_RELATIONS', icon: <Megaphone size={24} /> },
    { value: 'RESEARCH', icon: <Beaker size={24} /> },
    { value: 'CHARITY', icon: <Heart size={24} /> },
    { value: 'SUNDAY_SCHOOL', icon: <BookMarked size={24} /> },
    { value: 'MAHIBER', icon: <Users size={24} /> },
  ];

  const handleDepartmentClick = (dept: Department) => {
    const params = new URLSearchParams(searchParams);
    if (selectedDept === dept) {
      params.delete('department');
      router.push(`/members?${params.toString()}`);
    } else {
      params.set('department', dept);
      router.push(`/members?${params.toString()}`);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
          {language === 'am' ? 'ክፍል' : language === 'om' ? 'Kutaa' : language === 'ti' ? 'ክፍሊ' : 'Department'}
        </h2>
        <p className="text-xs text-slate-500">{language === 'am' ? 'ማጣሪያ' : language === 'om' ? 'Filtruu' : language === 'ti' ? 'ምልክት' : 'Filter'}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {DEPARTMENTS.map(({ value, icon }) => {
          const colors = DEPT_COLORS[value];
          const isSelected = selectedDept === value;
          const labels = DEPT_LABELS[value];
          const label = labels[language] || labels.en;

          return (
            <button
              key={value}
              onClick={() => handleDepartmentClick(value)}
              onMouseEnter={() => setHoveredDept(value)}
              onMouseLeave={() => setHoveredDept(null)}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? `${colors.bg} ${colors.border} ${colors.text} border-current shadow-md scale-105`
                  : `${colors.bg} ${colors.border} ${colors.text} border-transparent ${colors.hover}`
              }`}
            >
              <div className="text-3xl">{icon}</div>
              <div className="text-center">
                <p className="font-semibold text-sm leading-tight">{label}</p>
                {isSelected && <p className="text-xs mt-1 font-bold">✓ {language === 'am' ? 'ተመረጠ' : language === 'om' ? 'Filatame' : language === 'ti' ? 'ተመረጠ' : 'Selected'}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
