'use client';

import DashboardDepartments from '@/components/dashboard-departments';
import StatCard from '@/components/stat-card';
import { Users, UserCheck, TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardClientProps {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalCollected: number;
  totalExpenses: number;
  balance: number;
  attendanceRate: number;
}

export default function DashboardClient({
  totalMembers,
  activeMembers,
  inactiveMembers,
  totalCollected,
  totalExpenses,
  balance,
  attendanceRate,
}: DashboardClientProps) {
  const [language, setLanguage] = useState<'en' | 'am' | 'om' | 'ti'>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('language') as 'en' | 'am' | 'om' | 'ti' | null;
    if (saved) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const t = (key: string): string => {
    const translations: Record<string, Record<'en' | 'am' | 'om' | 'ti', string>> = {
      dashboard: { en: 'Dashboard', am: 'ዳሽቦርድ', om: 'Daashboorii', ti: 'ዳሽቦርድ' },
      members: { en: 'Members', am: 'አባላት', om: 'Miseensa', ti: 'ሓውሓውታት' },
      attendance: { en: 'Attendance', am: 'ስብሰባ ተገኝነት', om: 'Hirmaannaa', ti: 'ምርኩዝ' },
      finance: { en: 'Finance', am: 'ፋይናንስ', om: 'Raajii', ti: 'ገንዘብ' },
      active: { en: 'Active', am: 'ንቁ', om: 'Aktibii', ti: 'ንቁ' },
      inactive: { en: 'Inactive', am: 'ንቁ ያልሆነ', om: 'Aktibii Hin Taane', ti: 'ንቁ ዘይኮነ' },
      payment: { en: 'Payment', am: 'ክፍያ', om: 'Kaffaltii', ti: 'ክፍያ' },
      expense: { en: 'Expense', am: 'ወጪ', om: 'Baasii', ti: 'ወጪ' },
      paid: { en: 'Paid', am: 'ተከፍሏል', om: 'Kaffalame', ti: 'ተከፊለ' },
      search: { en: 'View', am: 'ይመልከቱ', om: 'Ilaaluu', ti: 'ርእዩ' },
      loading: { en: 'Loading...', am: 'በመጫን ላይ...', om: 'Fe\'uu...', ti: 'ክሳብ ሕጂ...' },
    };
    return translations[key]?.[language] || key;
  };

  if (!mounted) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t('dashboard')}</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {t('members')} · {t('attendance')} · {t('finance')}
          </p>
        </div>
        <span className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm font-medium shrink-0">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title={t('members')}
          value={totalMembers}
          icon={Users}
          color="blue"
          sub={`${inactiveMembers} ${t('inactive')}`}
        />
        <StatCard
          title={t('active')}
          value={activeMembers}
          icon={UserCheck}
          color="green"
          sub={t('active')}
        />
        <StatCard
          title={t('payment')}
          value={formatCurrency(totalCollected)}
          icon={TrendingUp}
          color="amber"
          sub={t('paid')}
        />
        <StatCard
          title={t('expense')}
          value={formatCurrency(totalExpenses)}
          icon={TrendingDown}
          color="red"
          sub={t('expense')}
        />
      </div>

      {/* Departments Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <DashboardDepartments />
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800">{t('finance')}</h2>
            <Link
              href="/finance"
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              {t('search')} <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {[
              {
                label: t('paid'),
                value: formatCurrency(totalCollected),
                bg: 'bg-emerald-50',
                border: 'border-emerald-200',
                text: 'text-emerald-700',
              },
              {
                label: t('expense'),
                value: formatCurrency(totalExpenses),
                bg: 'bg-rose-50',
                border: 'border-rose-200',
                text: 'text-rose-700',
              },
              {
                label: t('finance'),
                value: formatCurrency(balance),
                bg: balance >= 0 ? 'bg-blue-50' : 'bg-orange-50',
                border: balance >= 0 ? 'border-blue-200' : 'border-orange-200',
                text: balance >= 0 ? 'text-blue-700' : 'text-orange-700',
              },
            ].map(({ label, value, bg, border, text }) => (
              <div
                key={label}
                className={`rounded-lg border px-3.5 py-2.5 ${bg} ${border} flex items-center justify-between`}
              >
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className={`text-sm font-bold ${text}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-slate-800">{t('attendance')}</h2>
            <Link
              href="/attendance"
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              {t('search')} <ArrowRight size={12} />
            </Link>
          </div>
          <p
            className={`text-3xl font-black ${
              attendanceRate >= 75
                ? 'text-emerald-600'
                : attendanceRate >= 50
                ? 'text-amber-600'
                : 'text-rose-600'
            }`}
          >
            {attendanceRate}%
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{t('loading')}</p>
          <div className="mt-2.5 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                attendanceRate >= 75
                  ? 'bg-emerald-500'
                  : attendanceRate >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              } transition-all duration-700`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
