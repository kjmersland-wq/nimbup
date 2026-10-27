import {
  ArrowUp,
  BarChart3,
  FileUp,
  MessageCircleHeart,
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
    body: "Short, friendly modules, each one about the time it takes to drink a coffee.",
  },
  {
    icon: Timer,
    title: "Your team learns a little each day",
    body: "No big course to block out a Friday for. Just one small thing at a time.",
  },
];

const features = [
  {
    icon: Timer,
    title: "Short daily modules",
    body: "Five minutes or less. Easy to start, easy to finish.",
  },
  {
    icon: MessageCircleHeart,
    title: "Roleplay conversations",
    body: "Practice the tricky chat before it happens, with someone patient on the other side.",
  },
  {
    icon: BarChart3,
    title: "Insights for leaders",
    body: "See where people feel confident, and where a little help would go a long way.",
  },
];

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

      {/* 2. How it works */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-sm font-medium text-violet-300">How it works</p>
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
            Where would you like to start?
          </h2>
          <p className="mt-3 text-zinc-400">Three small steps. No setup, no training manual.</p>
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

      {/* 3. What you get */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-sm font-medium text-violet-300">What you get</p>
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
            What would make learning easier for your team?
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="glass glow-border h-full rounded-2xl p-6 text-left">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-violet-500/30 to-indigo-600/20 shadow-[0_0_30px_-8px_rgba(139,92,246,0.7)]">
                  <f.icon className="h-5 w-5 text-violet-200" strokeWidth={1.6} />
                </span>
                <h3 className="mb-1.5 text-lg font-medium tracking-tight">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Social proof (placeholder) */}
      <section className="mx-auto max-w-3xl px-4 py-24">
        <Reveal>
          <figure className="glass rounded-3xl p-8 text-center sm:p-12">
            <blockquote className="text-xl font-medium leading-snug tracking-tight sm:text-2xl">
              &ldquo;Placeholder quote: this is where a real leader tells us, in
              their own words, what changed for their team.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-zinc-500">
              Name Surname · Role, Company
              <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-500">
                placeholder
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* 5. Final CTA */}
      <section className="relative mx-auto max-w-4xl px-4 pb-28 pt-12">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[110px]"
        />
        <Reveal className="space-y-6 text-center">
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-5xl">
            Shall we try it with one of yours?
          </h2>
          <p className="mx-auto max-w-md text-zinc-400">
            Pick a document you&apos;ve been meaning to share. It takes a
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
