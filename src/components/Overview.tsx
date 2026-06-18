import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { TASKS, GROUP_LABEL, GROUP_ACCENT, type TaskGroup } from "../data/tasks";

const FAMILIES: { group: TaskGroup; blurb: string }[] = [
  { group: "long_horizon", blurb: "Multi-stage chains on a mobile base — sort, load, assemble, checkout." },
  { group: "simple_pnp", blurb: "Mobile pick-and-place across rooms, shelves, racks and tables." },
  { group: "teleop", blurb: "Fixed table-top tasks demanding dexterity and tight tolerances." },
];

const PIPELINE = [
  {
    step: "01",
    title: "Minimal client",
    body: "A tiny client package installs in any environment — no dependency conflicts with your policy stack.",
  },
  {
    step: "02",
    title: "Isaac Sim server",
    body: "The server renders photorealistic indoor scenes and physics in NVIDIA Isaac Sim over a client–server bridge.",
  },
  {
    step: "03",
    title: "Elemental diagnosis",
    body: "Rollouts are scored across capability dimensions and generalization splits — not just one overall number.",
  },
];

const SPLITS = [
  { tag: "Validation-Train", desc: "In-distribution scenes seen during training — measures fit." },
  { tag: "Validation-Unseen", desc: "Held-out instances of familiar tasks — measures transfer." },
  { tag: "Test-Mini", desc: "Distribution-shifted evaluation across the 4 generalization axes." },
];

export function Overview() {
  const counts = FAMILIES.map((f) => ({
    ...f,
    count: TASKS.filter((t) => t.group === f.group).length,
  }));

  return (
    <Section
      id="overview"
      index="01"
      eyebrow="What is EBench"
      title={
        <>
          A diagnostic instrument for{" "}
          <span className="text-ember">generalist manipulation</span>.
        </>
      }
      intro="EBench is an indoor VLA manipulation benchmark for long-horizon, dexterous, and mobile manipulation, built on NVIDIA Isaac Sim. A client–server architecture keeps the benchmark client tiny and conflict-free, so any policy can be evaluated fairly under identical physics and rendering."
    >
      {/* how it works */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {PIPELINE.map((p, i) => (
          <Reveal key={p.step} delay={i * 0.08} className="bg-surface p-7">
            <div className="font-mono text-[12px] font-medium tracking-widest text-ember/70">
              {p.step}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-paper">{p.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.body}</p>
          </Reveal>
        ))}
      </div>

      {/* task families + splits */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="panel h-full p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              26 tasks · 3 families
            </h3>
            <div className="mt-5 space-y-4">
              {counts.map((f) => (
                <div key={f.group} className="flex items-start gap-4">
                  <div
                    className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-display text-xl font-semibold"
                    style={{
                      color: GROUP_ACCENT[f.group],
                      backgroundColor: `${GROUP_ACCENT[f.group]}1a`,
                      border: `1px solid ${GROUP_ACCENT[f.group]}33`,
                    }}
                  >
                    {f.count}
                  </div>
                  <div>
                    <div className="font-semibold text-paper">{GROUP_LABEL[f.group]}</div>
                    <div className="text-[13.5px] leading-relaxed text-muted">{f.blurb}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel h-full p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Evaluation splits
            </h3>
            <div className="mt-5 space-y-4">
              {SPLITS.map((s, i) => (
                <div key={s.tag} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-ember/70" />
                  {i < SPLITS.length - 1 && (
                    <span className="absolute left-[3.5px] top-4 h-[calc(100%+0.5rem)] w-px bg-line" />
                  )}
                  <div className="font-mono text-[12.5px] font-medium text-paper">{s.tag}</div>
                  <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
