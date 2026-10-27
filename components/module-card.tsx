import { BookOpen, Clock, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModuleSuggestion } from "@/lib/modules";

/** One suggested lesson. Shared by the live upload result and the page mockups. */
export function ModuleCard({
  module: m,
  index,
  className,
}: {
  module: ModuleSuggestion;
  index: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3.5 rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-4 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:shadow-[0_16px_40px_-18px_rgba(139,92,246,0.45)]",
        className
      )}
    >
      <span
        aria-hidden
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-gradient-to-b from-violet-400/25 to-indigo-500/10"
      >
        <BookOpen className="h-4 w-4 text-violet-200" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="font-medium leading-snug tracking-tight">
            <span className="mr-2 font-mono text-xs text-violet-300">0{index + 1}</span>
            {m.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-xs text-zinc-300">
            <Clock className="h-3 w-3 text-violet-300" /> {m.minutes} min
          </span>
        </div>
        <p className="text-sm text-zinc-400">{m.hook}</p>
        <p className="mt-2 text-sm text-zinc-200">{m.takeaway}</p>
        <p className="mt-3 flex gap-2 rounded-lg bg-violet-400/[0.07] px-3 py-2 text-sm italic text-violet-100">
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
          {m.question}
        </p>
      </div>
    </div>
  );
}
