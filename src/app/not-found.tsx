export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-300">404</h1>
        <p className="mt-2 text-slate-500 text-lg font-medium">Page not found</p>
        <a href="/" className="mt-6 inline-block text-blue-600 hover:underline text-sm">
          Go back home
        </a>
      </div>
    </div>
  );
}
