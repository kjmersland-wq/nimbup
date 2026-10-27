"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  RotateCcw,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

type Stage = "idle" | "processing" | "complete";

const ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.txt,.md";

const STEPS = [
  "Reading your document…",
  "Finding the key ideas…",
  "Writing short lessons…",
  "Adding quick quizzes…",
];

const ease = [0.22, 1, 0.36, 1] as const;

const panel = {
  initial: { opacity: 0, y: 14, scale: 0.98, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -14, scale: 0.98, filter: "blur(6px)" },
  transition: { duration: 0.45, ease },
};

export function MagicUpload() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = useCallback((f: File | undefined) => {
    if (!f) return;
    setFile(f);
    setProgress(0);
    setStage("processing");
  }, []);

  const reset = () => {
    setStage("idle");
    setFile(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  // Eased, slightly uneven progress so it feels like real work.
  useEffect(() => {
    if (stage !== "processing") return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + (p < 70 ? 2.2 : p < 92 ? 1.1 : 0.6) * (0.6 + Math.random() * 0.8);
        return Math.min(next, 100);
      });
    }, 70);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "processing" && progress >= 100) {
      const t = setTimeout(() => setStage("complete"), 450);
      return () => clearTimeout(t);
    }
  }, [stage, progress]);

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
                    {dragging ? "Drop it here" : "Drop a document to begin"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    or <span className="text-zinc-200 underline underline-offset-4">browse files</span>
                    {" · "}PDF, Word, PowerPoint
                  </p>
                </div>
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
                <p className="mt-2 text-xs tabular-nums text-zinc-500">{Math.floor(progress)}%</p>
              </div>
            </motion.div>
          )}

          {stage === "complete" && (
            <motion.div
              key="complete"
              {...panel}
              className="flex min-h-[344px] flex-col items-center justify-center gap-6 px-8 py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 shadow-[0_0_60px_-8px_rgba(52,211,153,0.6)]"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.3 }}
                >
                  <Check className="h-9 w-9 text-emerald-300" strokeWidth={2.4} />
                </motion.span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease }}
                className="space-y-1.5"
              >
                <p className="text-xl font-semibold tracking-tight">Your course is ready</p>
                <p className="text-sm text-zinc-400">
                  12 short lessons and 8 quizzes from{" "}
                  <span className="text-zinc-200">{file?.name}</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease }}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <Button variant="accent" size="lg">
                  Review course <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="lg" onClick={reset}>
                  <RotateCcw className="h-4 w-4" /> Upload another
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
