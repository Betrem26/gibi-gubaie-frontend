'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client component to avoid hydration issues
const DashboardDepartments = dynamic(() => import('./dashboard-departments'), {
  loading: () => (
    <div className="space-y-6">
      <div className="h-8 bg-slate-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-40 bg-slate-200 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  ),
});

export default function DashboardDepartmentsWrapper() {
  return (
    <Suspense fallback={<div className="h-40 bg-slate-200 rounded animate-pulse" />}>
      <DashboardDepartments />
    </Suspense>
  );
}
