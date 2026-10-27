import { cn } from "@/lib/utils";

/** The Nimbup mark: an "n" arch (a soft cloud lobe) beside a rising arrow. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 64"
      fill="none"
      aria-hidden
      className={cn("h-8 w-auto", className)}
    >
      <defs>
        <linearGradient id="nimbup-up" x1="54" y1="50" x2="54" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14B8A6" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <path
        d="M10 50V30a14 14 0 0 1 28 0v20"
        stroke="#F1F5FF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M54 50V21M45 29.5 54 20.5 63 29.5"
        stroke="url(#nimbup-up)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Wordmark for dark backgrounds. Light-background files live in /public/brand. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-xl font-semibold leading-none tracking-tight">
        <span className="text-[#F1F5FF]">nimb</span>
        <span className="text-teal-300">up</span>
      </span>
      <span className="sr-only">Nimbup</span>
    </span>
  );
}
