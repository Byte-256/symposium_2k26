'use client';

import TccCompileRunPanel from '@/components/TccCompileRunPanel';

export default function CCheckingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">C Checking</h1>
        <p className="mb-6 text-slate-400">TinyCC compile check with browser-side execution.</p>
        <TccCompileRunPanel />
      </div>
    </main>
  );
}
