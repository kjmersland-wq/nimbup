import {
  ArrowUp,
  Clock,
  FileUp,
  Rocket,
  Sparkles,
  Timer,
  Wand2,
} from "lucide-react";
import { MagicUpload } from "@/components/magic-upload";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: FileUp,
    title: "Drop in what you already have",
    body: "A policy, a manual, a deck. Whatever your team keeps asking about.",
  },
  {
    icon: Wand2,
    title: "I turn it into small lessons",
    body: "Short, friendly modules, each about the length of a coffee break.",
  },
  {
    icon: Timer,
    title: "Your team learns a little each day",
    body: "No big course to block out a Friday for. One small thing at a time.",
  },
];

const gaps = [
  { label: "Customer conversations", value: 82 },
  { label: "Security basics", value: 64 },
  { label: "Expense process", value: 38 },
];

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-xl text-left">
      <p className="mb-3 text-sm font-medium text-violet-300">{eyebrow}</p>
      <h2 className="text-gradient text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-4 leading-relaxed text-zinc-400">{children}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-b from-violet-400 to-indigo-600 shadow-[0_0_20px_-2px_rgba(139,92,246,0.8)]">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          Nimbus
        </a>
        <Button asChild variant="ghost" size="sm">
          <a href="#upload">Try it with a document</a>
        </Button>
      </header>

      {/* 1. Hero */}
      <section id="top" className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pb-24 pt-10 text-center sm:pt-16">
        <Reveal className="max-w-2xl space-y-5">
          <h1 className="text-gradient text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            What if your documents could teach themselves?
          </h1>
          <p className="mx-auto max-w-lg text-base text-zinc-400 sm:text-lg">
            Learning something new at work is hard enough. Show me a policy,
            manual or deck, and I&apos;ll help turn it into short lessons your
            team can actually enjoy.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="flex w-full justify-center">
          <div id="upload" className="w-full max-w-xl scroll-mt-24">
            <MagicUpload />
          </div>
        </Reveal>
      </section>

      {/* 2. Problem */}
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <Reveal className="space-y-5">
          <p className="text-sm font-medium text-violet-300">Sound familiar?</p>
          <h2 className="text-gradient text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Remember your last onboarding week?
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-zinc-400">
            A stack of long documents, a few slide decks, and a hope that
            something stuck. Most of it was forgotten by Friday. Was that ever
            really your team&apos;s fault?
          </p>
        </Reveal>
      </section>

      {/* 3. How it works */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-sm font-medium text-violet-300">How it works</p>
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
            Where would you like to start?
          </h2>
          <p className="mt-3 text-zinc-400">Three small steps. No setup, no manual.</p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="glass h-full rounded-2xl p-6 text-left transition-colors hover:border-white/20">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <s.icon className="h-5 w-5 text-violet-300" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
                </div>
                <h3 className="mb-1.5 text-lg font-medium tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. For employees */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="For your team" title="What if learning felt like a five-minute breather?">
            Each day there&apos;s one small lesson, short enough to fit between
            meetings. Then comes the part people actually remember: a friendly
            practice chat, where they can try out a tricky conversation with
            someone patient, and no one is watching.
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass glow-border space-y-3 rounded-3xl p-5">
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div>
                <p className="text-xs text-zinc-500">Today&apos;s lesson</p>
                <p className="font-medium tracking-tight">Handling a frustrated customer</p>
              </div>
              <span className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-400">
                <Clock className="h-3 w-3" /> 4 min
              </span>
            </div>
            <div className="space-y-2.5 px-1 pt-1 text-sm">
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-2.5 text-zinc-200">
                I&apos;ve been waiting a week for a reply. What happened?
              </p>
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-b from-violet-500 to-indigo-600 px-4 py-2.5 text-white">
                I&apos;m really sorry about the wait. Can I look into it right now?
              </p>
              <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.06] px-4 py-2.5 text-zinc-400">
                That&apos;s a kind start. How might you find out what went wrong?
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5. For leaders */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
        <Reveal delay={0.12} className="order-2 md:order-1">
          <div className="glass glow-border space-y-5 rounded-3xl p-6">
            <div>
              <p className="text-xs text-zinc-500">Where would a little help go a long way?</p>
              <p className="font-medium tracking-tight">Team confidence, this month</p>
            </div>
            <ul className="space-y-4">
              {gaps.map((g) => (
                <li key={g.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-zinc-300">{g.label}</span>
                    <span className="tabular-nums text-zinc-500">{g.value}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                      style={{ width: `${g.value}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-zinc-500">Example numbers, just to show the idea.</p>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <SectionHeading eyebrow="For leaders" title="Wouldn't it help to see where your team needs you?">
            Nimbus quietly shows where people feel confident and where a bit of
            support would matter. And when something changes, a new policy or a
            new product, you can share it with everyone as short lessons the
            same afternoon.
          </SectionHeading>
          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400">
            <Rocket className="h-4 w-4 text-violet-300" />
            From a new document to a new lesson in minutes.
          </div>
        </Reveal>
      </section>

      {/* 6. Final CTA */}
      <section className="relative mx-auto max-w-4xl px-4 pb-28 pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[110px]"
        />
        <Reveal className="space-y-6 text-center">
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-5xl">
            Shall we try it with one of yours?
          </h2>
          <p className="mx-auto max-w-md text-zinc-400">
            Pick a document you&apos;ve been meaning to share. It only takes a
            moment, and there&apos;s nothing to commit to.
          </p>
          <Button asChild variant="accent" size="lg">
            <a href="#upload">
              <ArrowUp className="h-4 w-4" /> Take me to the upload
            </a>
          </Button>
        </Reveal>
      </section>

      <footer className="mx-auto max-w-6xl border-t border-white/[0.06] px-4 py-8 text-center text-xs text-zinc-500">
        Nimbus · Made with care.
      </footer>
    </main>
  );
}
