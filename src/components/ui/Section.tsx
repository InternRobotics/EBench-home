import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-20 sm:py-28 ${className ?? ""}`}>
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[12px] font-medium tabular-nums text-ember/70">
              {index}
            </span>
            <span className="eyebrow">{eyebrow}</span>
            <span className="h-px flex-1 translate-y-[-1px] bg-gradient-to-r from-line to-transparent" />
          </div>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.08] text-paper sm:text-[2.6rem]">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">{intro}</p>
          )}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
