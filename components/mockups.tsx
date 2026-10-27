"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Flame,
  MessageCircle,
  Send,
  Sun,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** A small app window, so the mockups read as real product screenshots. */
function AppWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass glow-border flex h-full flex-col overflow-hidden rounded-3xl text-left shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95),0_0_80px_-40px_rgba(139,92,246,0.5)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </span>
        <span className="mx-auto pr-10 text-xs text-zinc-500">{title}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">{children}</div>
    </div>
  );
}

/* ---------- How it works: one small visual per step ---------- */

export function StepVisual({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div
      aria-hidden
      className="relative mb-5 flex h-40 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-4"
    >
      <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-40 -translate-x-1/2 rounded-full bg-violet-500/15 blur-2xl" />
      {step === 1 && <DropVisual />}
      {step === 2 && <LessonsVisual />}
      {step === 3 && <DaysVisual />}
    </div>
  );
}

function DropVisual() {
  return (
    <div className="flex w-full max-w-[220px] flex-col items-center gap-3 rounded-xl border border-dashed border-white/15 px-4 py-4">
      <UploadCloud className="h-5 w-5 text-violet-300" strokeWidth={1.6} />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-xs text-zinc-300 shadow-lg"
      >
        <FileText className="h-3.5 w-3.5 shrink-0 text-violet-300" />
        <span className="truncate">Employee-handbook.pdf</span>
      </motion.div>
    </div>
  );
}

function LessonsVisual() {
  const items = [
    { t: "Choosing your office days", m: 4, q: "Which days work best for you?" },
    { t: "Keeping your expenses tidy", m: 3, q: "Where do you keep receipts?" },
  ];
  return (
    <div className="flex w-full max-w-[270px] flex-col gap-2">
      {items.map((it, i) => (
        <motion.div
          key={it.t}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.15 }}
          className="flex gap-2.5 rounded-lg border border-white/10 bg-surface/90 px-2.5 py-2 text-left shadow-lg"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-400/20">
            <Sun className="h-3 w-3 text-violet-200" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-xs font-medium">{it.t}</span>
              <span className="flex shrink-0 items-center gap-1 text-[10px] text-zinc-500">
                <Clock className="h-2.5 w-2.5" /> {it.m} min
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] italic text-violet-200/80">
              <MessageCircle className="h-2.5 w-2.5 shrink-0" /> {it.q}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DaysVisual() {
  const days = ["M", "T", "W", "T", "F"];
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {days.map((d, i) => {
          const done = i < 3;
          const today = i === 3;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.1 }}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border text-xs",
                done && "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
                today &&
                  "border-violet-400/60 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_-4px_rgba(139,92,246,0.8)]",
                !done && !today && "border-white/10 text-zinc-500"
              )}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2.4} /> : d}
            </motion.div>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">Today: one small lesson, 4 min</p>
    </div>
  );
}

/* ---------- For your team: lesson page and practice chat ---------- */

export function LessonMockup() {
  return (
    <AppWindow title="nimbup.com / today">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/25 bg-violet-400/10 px-2.5 py-1 text-xs font-medium text-violet-100">
          <Sun className="h-3.5 w-3.5 text-violet-300" /> Today&apos;s lesson
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-xs text-amber-200">
          <Flame className="h-3.5 w-3.5" /> 3-day streak
        </span>
      </div>

      <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
        <span>Lesson 1 of 4</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 4 min
        </span>
      </div>
      <div className="mb-5 flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i === 0 ? "bg-gradient-to-r from-violet-400 to-sky-300" : "bg-white/10"
            )}
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold tracking-tight">Choosing your office days</h3>
      <p className="mt-1 text-sm text-zinc-400">Ever wondered how flexible remote work really is?</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-200">
        You can work from home up to three days a week. Just let your manager
        know which days you plan to be in, and keep your calendar up to date.
      </p>

      <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-4">
        <p className="flex gap-2 text-sm italic text-violet-100">
          <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
          Which days would work best for you?
        </p>
        <p className="mt-3 rounded-lg border border-violet-300/30 bg-black/25 px-3 py-2.5 text-sm text-zinc-500 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]">
          Write a thought, or just think about it…
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="text-sm text-zinc-500">Skip for now</span>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-violet-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_30px_-8px_rgba(139,92,246,0.7)]">
          Got it, next <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </AppWindow>
  );
}

const chat = [
  { from: "them", text: "I've been waiting a week for a reply. What happened?", time: "9:41" },
  { from: "you", text: "I'm really sorry about the wait. Can I look into it right now?", time: "9:42" },
  { from: "them", text: "That's a kind start. How might you find out what went wrong?", time: "9:42" },
] as const;

export function ChatMockup() {
  return (
    <AppWindow title="nimbup.com / practice">
      <div className="mb-4 flex items-center gap-3">
        <span className="relative">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-violet-400 to-indigo-600 text-sm font-semibold">
            M
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#18181b] bg-emerald-400" />
        </span>
        <div>
          <p className="text-sm font-medium leading-tight">Practice with Maya</p>
          <p className="text-xs text-zinc-500">A frustrated customer. No pressure, no score.</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 text-sm">
        {chat.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.7 }}
            className={cn("flex max-w-[85%] flex-col gap-1", m.from === "you" && "ml-auto items-end")}
          >
            <p
              className={cn(
                "rounded-2xl px-4 py-2.5 shadow-md",
                m.from === "you"
                  ? "rounded-br-md bg-gradient-to-b from-violet-500 to-indigo-600 text-white"
                  : "rounded-bl-md border border-white/[0.06] bg-white/[0.07] text-zinc-100"
              )}
            >
              {m.text}
            </p>
            <span className="px-1 text-[10px] text-zinc-600">{m.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <p className="mb-1.5 px-1 text-xs font-medium text-violet-300">Your turn</p>
        <div className="flex items-center gap-2 rounded-2xl border border-violet-300/40 bg-black/30 py-2 pl-4 pr-2 text-sm shadow-[0_0_0_4px_rgba(139,92,246,0.1),0_0_30px_-10px_rgba(139,92,246,0.7)]">
          <span className="flex-1 text-zinc-200">
            I&apos;d start by asking what went wrong
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-violet-300"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-violet-500 to-indigo-600 shadow-[0_6px_20px_-6px_rgba(139,92,246,0.9)]">
            <Send className="h-4 w-4 text-white" />
          </span>
        </div>
      </div>
    </AppWindow>
  );
}

/* ---------- For leaders: where would a little help go a long way? ---------- */

const gaps = [
  { label: "Customer conversations", value: 82 },
  { label: "Security basics", value: 64 },
  { label: "Expense process", value: 38 },
];

function tone(v: number) {
  if (v >= 75)
    return { text: "Feeling confident", color: "#34d399", dot: "bg-emerald-400", chip: "text-emerald-300 border-emerald-400/25 bg-emerald-400/10" };
  if (v >= 50)
    return { text: "Getting there", color: "#38bdf8", dot: "bg-sky-400", chip: "text-sky-300 border-sky-400/25 bg-sky-400/10" };
  return { text: "Could use a little help", color: "#fbbf24", dot: "bg-amber-400", chip: "text-amber-300 border-amber-400/25 bg-amber-400/10" };
}

function Ring({ value, color, delay }: { value: number; color: string; delay: number }) {
  const r = 26;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: value / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tabular-nums">
        {value}
        <span className="text-[10px] text-zinc-500">%</span>
      </span>
    </div>
  );
}

export function GapPanel() {
  return (
    <AppWindow title="nimbup.com / team">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">Where would a little help go a long way?</p>
          <p className="font-medium tracking-tight">Team confidence, this month</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-500">
          Example
        </span>
      </div>

      <ul className="space-y-2.5">
        {gaps.map((g, i) => {
          const t = tone(g.value);
          return (
            <li
              key={g.label}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-3.5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
            >
              <Ring value={g.value} color={t.color} delay={0.2 + i * 0.15} />
              <div className="min-w-0">
                <p className="font-medium leading-snug">{g.label}</p>
                <span
                  className={cn(
                    "mt-1.5 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs",
                    t.chip
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
                  {t.text}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-violet-400/25 bg-violet-400/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-violet-100">
          Expenses are at 38%. Want to share a short lesson with everyone?
        </p>
        <span className="relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-violet-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_30px_-6px_rgba(139,92,246,0.9)]">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-xl ring-2 ring-violet-300/50"
            animate={{ opacity: [0.7, 0], scale: [1, 1.12] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <Send className="h-4 w-4" /> Share lesson
        </span>
      </div>
    </AppWindow>
  );
}
