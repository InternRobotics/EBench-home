import { useEffect, useState } from "react";
import { GithubIcon, ArrowUpRight } from "../lib/icons";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "dimensions", label: "Dimensions" },
  { id: "tasks", label: "Tasks" },
  { id: "results", label: "Results" },
  { id: "cite", label: "Cite" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line/80 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="group flex items-center">
          <span className="font-display text-lg font-semibold tracking-tightest text-paper">
            EBench
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={[
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                active === s.id ? "text-ember" : "text-muted hover:text-paper",
              ].join(" ")}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/InternRobotics/GenManip"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ember/50 hover:text-paper"
          >
            <GithubIcon width={17} height={17} />
          </a>
          <a
            href="https://arxiv.org/abs/2606.18239"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[13px] font-semibold text-ink transition-all hover:bg-ember-bright"
          >
            arXiv
            <ArrowUpRight
              width={13}
              height={13}
              className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
