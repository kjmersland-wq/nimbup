"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Clock,
  FileText,
  MessageCircle,
  RotateCcw,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";
import type { AnalyzeResponse, ModuleSuggestion } from "@/lib/modules";

type Stage = "idle" | "processing" | "complete";
type Result = { documentTitle: string; modules: ModuleSuggestion[] };

const ACCEPT = ".pdf,.docx";
const MAX_BYTES = 4 * 1024 * 1024;

const STEPS = [
  "I'm reading through it now…",
  "Looking for the ideas that matter most…",
  "Turning them into short lessons…",
  "Thinking up a few friendly questions…",
];

const ease = [0.22, 1, 0.36, 1] as const;

const panel = {
  initial: { opacity: 0, y: 14, scale: 0.98, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: 0.98, filter: "blur(6px)" },
  transition: { duration: 0.45, ease },
};

function validate(f: File): string | null {
  const name = f.name.toLowerCase();
  if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
    return "I can read PDF and Word (.docx) files for now. Could you try one of those?";
  }
  if (f.size > MAX_BYTES) {
    return "That one's a bit big for me right now. Could you try a file under 4 MB?";
  }
  return null;
}

export function MagicUpload() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const runId = useRef(0);

  const reset = useCallback(() => {
    runId.current++;
    setStage("idle");
    setFile(null);
    setProgress(0);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const start = useCallback(
    async (f: File | undefined) => {
      if (!f) return;
      const problem = validate(f);
      if (problem) {
        setError(problem);
        if (inputRef.current) inputRef.current.value = "";
        return;
      }

      const id = ++runId.current;
      setError(null);
      setResult(null);
      setFile(f);
      setProgress(0);
      setStage("processing");

      try {
        const body = new FormData();
        body.append("file", f);
        const res = await fetch("/api/analyze", { method: "POST", body });
        const data = (await res.json()) as AnalyzeResponse;
        if (id !== runId.current) return;
        if (!data.ok) throw new Error(data.message);
        setResult({ documentTitle: data.documentTitle, modules: data.modules });
      } catch (e) {
        if (id !== runId.current) return;
        setError(
          e instanceof Error && e.message && !/fetch|json|network/i.test(e.message)
            ? e.message
            : "Something got in the way on my end. Want to try that again?"
        );
        setStage("idle");
        setFile(null);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    []
  );

  // Eased, slightly uneven progress. It waits near the end until the real
  // answer arrives, then glides to the finish.
  useEffect(() => {
    if (stage !== "processing") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const ceiling = result ? 100 : 92;
        const base = result ? 4 : p < 70 ? 1.6 : p < 90 ? 0.5 : 0.08;
        return Math.min(p + base * (0.6 + Math.random() * 0.8), ceiling);
      });
    }, 70);
    return () => clearInterval(id);
  }, [stage, result]);

  useEffect(() => {
    if (stage === "processing" && result && progress >= 100) {
      const t = setTimeout(() => setStage("complete"), 450);
      return () => clearTimeout(t);
    }
  }, [stage, result, progress]);

  const stepIndex = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));

  return (
    <div className="relative w-full max-w-xl">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl"
        animate={{
          opacity: stage === "idle" ? 0.35 : 0.6,
          background:
            stage === "complete"
              ? "radial-gradient(closest-side, rgba(52,211,153,0.35), transparent)"
              : "radial-gradient(closest-side, rgba(139,92,246,0.45), transparent)",
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="glass glow-border relative min-h-[360px] overflow-hidden rounded-3xl p-2">
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => start(e.target.files?.[0])}
        />

        <AnimatePresence mode="wait" initial={false}>
          {stage === "idle" && (
            <motion.div key="idle" {...panel} className="h-full">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  start(e.dataTransfer.files?.[0]);
                }}
                className={cn(
                  "group flex min-h-[344px] w-full flex-col items-center justify-center gap-5 rounded-[1.25rem] border border-dashed px-6 py-10 text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
                  dragging
                    ? "border-violet-400/80 bg-violet-500/10"
                    : "border-white/10 hover:border-white/25 hover:bg-white/[0.03]"
                )}
              >
                <motion.div
                  animate={{ y: dragging ? -6 : 0, scale: dragging ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] shadow-[0_0_40px_-8px_rgba(139,92,246,0.6)]"
                >
                  <UploadCloud className="h-7 w-7 text-violet-300" strokeWidth={1.6} />
                </motion.div>
                <div className="space-y-1.5">
                  <p className="text-lg font-medium tracking-tight">
                    {dragging
                      ? "Oh, perfect — just let go"
                      : "Got a document you want to turn into short lessons?"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Just drop it here, or{" "}
                    <span className="text-zinc-200 underline underline-offset-4">find it on your computer</span>
                    . PDF or Word (.docx), up to 4 MB.
                  </p>
                </div>
                <AnimatePresence>
                  {error && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="max-w-sm rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-2.5 text-sm text-amber-200"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          )}

          {stage === "processing" && (
            <motion.div
              key="processing"
              {...panel}
              className="flex min-h-[344px] flex-col items-center justify-center gap-7 px-8 py-10 text-center"
            >
              <div className="relative flex h-16 w-16 items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-2xl bg-violet-500/30 blur-xl"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface"
                >
                  <Sparkles className="h-7 w-7 text-violet-300" strokeWidth={1.6} />
                </motion.div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300">
                <FileText className="h-3.5 w-3.5 text-zinc-400" />
                <span className="max-w-[220px] truncate">{file?.name}</span>
                {file && <span className="text-zinc-500">{formatBytes(file.size)}</span>}
              </div>

              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -14, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="text-base font-medium"
                  >
                    {STEPS[stepIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="w-full max-w-xs">
                <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-300"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="h-full w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  This usually takes a moment. Feel free to grab a coffee.
                </p>
              </div>
            </motion.div>
          )}

          {stage === "complete" && result && (
            <motion.div
              key="complete"
              {...panel}
              className="flex flex-col items-center gap-6 px-4 py-8 text-center sm:px-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_50px_-8px_rgba(52,211,153,0.6)]"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.3 }}
                >
                  <Check className="h-7 w-7 text-emerald-300" strokeWidth={2.4} />
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease }}
                className="space-y-1.5"
              >
                <p className="text-xl font-semibold tracking-tight">
                  I&apos;ve put together {result.modules.length} short lessons from this.
                </p>
                <p className="text-sm text-zinc-400">
                  They&apos;re based on{" "}
                  <span className="text-zinc-200">{result.documentTitle}</span>. Do any of these
                  feel like the right place to start?
                </p>
              </motion.div>

              <ul className="w-full space-y-2.5 text-left">
                {result.modules.map((m, i) => (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.5, ease }}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="mb-1.5 flex items-start justify-between gap-3">
                      <h3 className="font-medium leading-snug tracking-tight">
                        <span className="mr-2 font-mono text-xs text-violet-300">0{i + 1}</span>
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
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + result.modules.length * 0.1, duration: 0.5, ease }}
              >
                <Button variant="ghost" size="lg" onClick={reset}>
                  <RotateCcw className="h-4 w-4" /> Try another document
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
