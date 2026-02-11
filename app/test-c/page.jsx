import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TccCompileRunPanel from '@/components/TccCompileRunPanel';

export default function TestCPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.06] p-6">
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              TinyCC Browser Test
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              This page compiles C code in your browser using `tcc-wasm` and runs it client-side.
            </p>
          </div>

          <TccCompileRunPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
