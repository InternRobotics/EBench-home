import { RESOURCE_LINKS } from "../data/content";
import { ICONS, ArrowUpRight } from "../lib/icons";
import { asset, isExternal } from "../lib/asset";

export function Footer() {
  return (
    <footer className="relative border-t border-line py-16">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          {/* brand */}
          <div>
            <div className="flex items-center">
              <span className="font-display text-xl font-semibold text-paper">EBench</span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-muted">
              Elemental Diagnosis of Generalist Mobile Manipulation Policies — an Isaac-Sim benchmark
              of 26 long-horizon, dexterous and mobile manipulation tasks.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-wide text-faint">
              Built with React + Vite · deployed on GitHub Pages
            </p>
          </div>

          {/* resources */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-faint">
              Resources
            </h3>
            <div className="mt-5 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {RESOURCE_LINKS.map((l) => {
                const Icon = ICONS[l.icon];
                const ext = isExternal(l.href);
                return (
                  <a
                    key={l.label}
                    href={ext ? l.href : asset(l.href)}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-2.5 border-b border-line/60 py-2.5 text-[13.5px] text-muted transition-colors hover:text-paper"
                  >
                    <Icon width={15} height={15} className="text-ember/70" />
                    <span className="flex-1">{l.label}</span>
                    <ArrowUpRight
                      width={12}
                      height={12}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-[11.5px] text-faint">
            © 2026 EBench · InternRobotics. For research use.
          </p>
          <a
            href="#top"
            className="font-mono text-[11.5px] text-muted transition-colors hover:text-ember"
          >
            back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
