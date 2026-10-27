"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  MessageCircle,
  Send,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

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
        className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-surface px-2.5 py-1.5 text-xs text-zinc-300"
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
    <div className="flex w-full max-w-[260px] flex-col gap-2">
      {items.map((it, i) => (
        <motion.div
          key={it.t}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.25 + i * 0.15 }}
          className="rounded-lg border border-white/10 bg-surface/90 px-3 py-2 text-left shadow-lg"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-xs font-medium">{it.t}</span>
            <span className="flex shrink-0 items-center gap-1 text-[10px] text-zinc-500">
              <Clock className="h-2.5 w-2.5" /> {it.m} min
            </span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] italic text-violet-200/80">
            <MessageCircle className="h-2.5 w-2.5 shrink-0" /> {it.q}
          </p>
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
    <div className="glass glow-border flex h-full flex-col rounded-3xl p-5 text-left">
      <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
        <span>Lesson 1 of 4</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> 4 min
        </span>
      </div>
      <div className="mb-5 flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("h-1 flex-1 rounded-full", i === 0 ? "bg-violet-400" : "bg-white/10")}
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
        <p className="mt-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-500">
          Write a thought, or just think about it…
        </p>
      </div>
      <div className="mt-auto flex justify-end pt-5">
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-zinc-950">
          Got it, next <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

const chat = [
  { from: "them", text: "I've been waiting a week for a reply. What happened?" },
  { from: "you", text: "I'm really sorry about the wait. Can I look into it right now?" },
  { from: "them", text: "That's a kind start. How might you find out what went wrong?" },
] as const;

export function ChatMockup() {
  return (
    <div className="glass glow-border flex h-full flex-col rounded-3xl p-5 text-left">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-violet-400 to-indigo-600 text-sm font-semibold">
          M
        </span>
        <div>
          <p className="text-sm font-medium leading-tight">Practice chat</p>
          <p className="text-xs text-zinc-500">A frustrated customer, no pressure</p>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 text-sm">
        {chat.map((m, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.7 }}
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5",
              m.from === "you"
                ? "ml-auto rounded-br-md bg-gradient-to-b from-violet-500 to-indigo-600 text-white"
                : "rounded-bl-md bg-white/[0.06] text-zinc-200"
            )}
          >
            {m.text}
          </motion.p>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.3 + chat.length * 0.7 }}
          className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-3"
          aria-hidden
        >
          {[0, 1, 2].map((d) => (
            <motion.span
              key={d}
              className="h-1.5 w-1.5 rounded-full bg-zinc-400"
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-500">
        Try your own words…
        <Send className="h-4 w-4 text-violet-300" />
      </div>
    </div>
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
    return { text: "Feeling confident", chip: "text-emerald-300 border-emerald-400/25 bg-emerald-400/10", bar: "from-emerald-400 to-teal-300" };
  if (v >= 50)
    return { text: "Getting there", chip: "text-sky-300 border-sky-400/25 bg-sky-400/10", bar: "from-violet-400 to-sky-300" };
  return { text: "Could use a little help", chip: "text-amber-300 border-amber-400/25 bg-amber-400/10", bar: "from-amber-400 to-orange-300" };
}

export function GapPanel() {
  return (
    <div className="glass glow-border space-y-5 rounded-3xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-zinc-500">Where would a little help go a long way?</p>
          <p className="font-medium tracking-tight">Team confidence, this month</p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-500">
          Example
        </span>
      </div>

      <ul className="space-y-3">
        {gaps.map((g, i) => {
          const t = tone(g.value);
          return (
            <li key={g.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{g.label}</span>
                <span className="text-2xl font-semibold tabular-nums tracking-tight">
                  {g.value}
                  <span className="text-base text-zinc-500">%</span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  className={cn("h-full rounded-full bg-gradient-to-r", t.bar)}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${g.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease, delay: 0.2 + i * 0.15 }}
                />
              </div>
              <span className={cn("mt-3 inline-block rounded-full border px-2 py-0.5 text-xs", t.chip)}>
                {t.text}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-violet-400/20 bg-violet-400/[0.06] p-4">
        <p className="text-sm text-violet-100">
          Expenses are at 38%. Want to share a short lesson with everyone?
        </p>
        <span className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-950">
          Share lesson
        </span>
      </div>
    </div>
  );
}
