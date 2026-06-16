export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-36 bg-slate-200 rounded-lg" />
          <div className="h-4 w-56 bg-slate-100 rounded mt-2" />
        </div>
        <div className="h-8 w-32 bg-slate-200 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5 h-64" />
        <div className="bg-white rounded-xl border border-slate-200 p-5 h-64" />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 h-48" />
    </div>
  );
}
