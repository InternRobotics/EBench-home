import { PAPER } from "../data/content";
import { Reveal } from "./ui/Reveal";

const FINDINGS = [
  {
    model: "π₀.₅",
    color: "#FF8FA3",
    text: "Highest test success rate and the best train–test retention of the four baselines.",
  },
  {
    model: "InternVLA-A1",
    color: "#75CFB8",
    text: "Dominates mobile manipulation, yet collapses on dexterous, high-precision tasks.",
  },
  {
    model: "XVLA",
    color: "#FFD670",
    text: "Strong on a disjoint set of atomic skills compared with the other policies.",
  },
];

export function Abstract() {
  return (
    <section id="abstract" className="relative scroll-mt-24 py-20 sm:py-24">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow">Abstract</span>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight text-paper sm:text-4xl">
                Two policies can share a success rate and have nothing else in common.
              </h2>
              <p className="mt-6 font-mono text-[12px] leading-relaxed tracking-wide text-faint">
                arXiv:{PAPER.arxivId} · {PAPER.venue}
              </p>
              <div className="mt-8 space-y-3">
                {FINDINGS.map((f) => (
                  <div
                    key={f.model}
                    className="flex gap-3 rounded-xl border border-line bg-surface/60 p-4"
                  >
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: f.color, boxShadow: `0 0 10px ${f.color}` }}
                    />
                    <p className="text-[13.5px] leading-relaxed text-muted">
                      <span className="font-semibold text-paper">{f.model}</span> — {f.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <span className="absolute -left-4 -top-6 select-none font-display text-7xl leading-none text-line">
                “
              </span>
              <p className="text-[17px] leading-[1.75] text-paper/85 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-ember">
                {PAPER.abstract}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
