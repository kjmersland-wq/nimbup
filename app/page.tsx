import { Sparkles } from "lucide-react";
import { MagicUpload } from "@/components/magic-upload";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-4">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[420px] w-[520px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <header className="flex w-full max-w-6xl items-center justify-between py-6">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-violet-400 to-indigo-600 shadow-[0_0_20px_-2px_rgba(139,92,246,0.8)]">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          Nimbus
        </div>
      </header>

      <section className="flex w-full flex-1 flex-col items-center justify-center gap-12 pb-24 pt-8 text-center">
        <div className="max-w-2xl space-y-5">
          <h1 className="text-gradient text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Turn any document into training your team finishes
          </h1>
          <p className="mx-auto max-w-lg text-base text-zinc-400 sm:text-lg">
            Drop in a policy, manual or deck. Nimbus makes short lessons and
            quizzes in under a minute.
          </p>
        </div>

        <MagicUpload />
      </section>
    </main>
  );
}
