import { Clock, MessageCircle } from "lucide-react";
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
        "rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.05]",
        className
      )}
    >
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <h3 className="font-medium leading-snug tracking-tight">
          <span className="mr-2 font-mono text-xs text-violet-300">0{index + 1}</span>
          {m.title}
        </h3>
        <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-400">
          <Clock className="h-3 w-3" /> {m.minutes} min
        </span>
      </div>
      <p className="text-sm text-zinc-400">{m.hook}</p>
      <p className="mt-2 text-sm text-zinc-200">{m.takeaway}</p>
      <p className="mt-2.5 flex gap-2 text-sm italic text-violet-200/90">
        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
        {m.question}
      </p>
    </div>
  );
}
