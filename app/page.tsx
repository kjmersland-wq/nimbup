import { ArrowUp, Rocket } from "lucide-react";
import { Logo } from "@/components/logo";
import { MagicUpload } from "@/components/magic-upload";
import { ChatMockup, GapPanel, LessonMockup, StepVisual } from "@/components/mockups";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Drop in what you already have",
    body: "A policy, a manual, a deck. Whatever your team keeps asking about.",
  },
  {
    title: "I turn it into small lessons",
    body: "Short, friendly modules, each about the length of a coffee break.",
  },
  {
    title: "Your team learns a little each day",
    body: "No big course to block out a Friday for. One small thing at a time.",
  },
] as const;

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
    <main className="relative overflow-x-clip">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]">
        <div className="bg-grid absolute inset-0" />
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.05] bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
          <a href="#top" aria-label="Nimbup home" className="shrink-0">
            <Logo />
          </a>
          <nav aria-label="Sections" className="hidden items-center gap-1 text-sm text-zinc-400 md:flex">
            {[
              ["How it works", "#how"],
              ["For your team", "#team"],
              ["For leaders", "#leaders"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-1.5 transition-colors hover:bg-white/[0.05] hover:text-zinc-100"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button asChild variant="ghost" size="sm">
            <a href="#upload">Try it with a document</a>
          </Button>
        </div>
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
      <section id="how" className="scroll-mt-16 mx-auto max-w-6xl px-4 py-24">
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
                <StepVisual step={(i + 1) as 1 | 2 | 3} />
                <p className="mb-1 font-mono text-xs text-violet-300">0{i + 1}</p>
                <h3 className="mb-1.5 text-lg font-medium tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. For employees */}
      <section id="team" className="scroll-mt-16 mx-auto max-w-6xl px-4 py-24">
        <Reveal>
          <SectionHeading eyebrow="For your team" title="What if learning felt like a five-minute breather?">
            Each day there&apos;s one small lesson, short enough to fit between
            meetings. Then comes the part people actually remember: a friendly
            practice chat, where they can try out a tricky conversation with
            someone patient, and no one is watching.
          </SectionHeading>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal delay={0.05}>
            <LessonMockup />
          </Reveal>
          <Reveal delay={0.15}>
            <ChatMockup />
          </Reveal>
        </div>
      </section>

      {/* 5. For leaders */}
      <section id="leaders" className="scroll-mt-16 mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
        <Reveal delay={0.12} className="order-2 md:order-1">
          <GapPanel />
        </Reveal>

        <Reveal className="order-1 md:order-2">
          <SectionHeading eyebrow="For leaders" title="Wouldn't it help to see where your team needs you?">
            Nimbup quietly shows where people feel confident and where a bit of
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
        Nimbup · nimbup.com · Made with care.
      </footer>
    </main>
  );
}
