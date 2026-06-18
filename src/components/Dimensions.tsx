import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { CAPABILITY_DIMENSIONS, GENERALIZATION_DIMENSIONS } from "../data/content";

export function Dimensions() {
  const [active, setActive] = useState(0);
  const dim = CAPABILITY_DIMENSIONS[active];

  return (
    <Section
      id="dimensions"
      index="02"
      eyebrow="Taxonomy"
      title={
        <>
          Five capability dimensions.{" "}
          <span className="text-muted">Four generalization axes.</span>
        </>
      }
      intro="Every task is annotated along five orthogonal capability dimensions. Crossing them with four distribution-shift axes turns a single benchmark into a dense grid of diagnostic signals."
    >
      {/* capability explorer */}
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
        {/* selector list */}
        <Reveal>
          <ul className="overflow-hidden rounded-2xl border border-line">
            {CAPABILITY_DIMENSIONS.map((d, i) => {
              const on = i === active;
              return (
                <li key={d.key}>
                  <button
                    onClick={() => setActive(i)}
                    className={[
                      "group flex w-full items-center gap-4 border-b border-line px-5 py-4 text-left transition-colors last:border-b-0",
                      on ? "bg-surface-2" : "bg-surface/40 hover:bg-surface-2/60",
                    ].join(" ")}
                  >
                    <span
                      className="font-mono text-[12px] font-medium tabular-nums transition-colors"
                      style={{ color: on ? d.accent : "#62626E" }}
                    >
                      {d.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className="block font-display text-lg font-semibold transition-colors"
                        style={{ color: on ? "#EDEBE3" : "#9A9AA6" }}
                      >
                        {d.name}
                      </span>
                      <span className="block text-[12.5px] text-faint">{d.tagline}</span>
                    </span>
                    <span
                      className="h-7 w-1 rounded-full transition-all"
                      style={{
                        backgroundColor: on ? d.accent : "transparent",
                        boxShadow: on ? `0 0 12px ${d.accent}` : "none",
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* detail panel */}
        <Reveal delay={0.08}>
          <div className="panel relative h-full overflow-hidden p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: dim.accent }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="rounded-md px-2 py-1 font-mono text-[11px] font-semibold tracking-widest"
                    style={{ color: dim.accent, backgroundColor: `${dim.accent}1a` }}
                  >
                    DIM {dim.index}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                    {dim.buckets.length} buckets
                  </span>
                </div>
                <h3 className="mt-4 font-display text-3xl font-semibold text-paper">{dim.name}</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                  {dim.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {dim.buckets.map((b) => (
                    <span
                      key={b}
                      className="rounded-full border px-3 py-1 text-[12.5px] font-medium"
                      style={{
                        color: dim.accent,
                        borderColor: `${dim.accent}40`,
                        backgroundColor: `${dim.accent}12`,
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>

      {/* generalization axes */}
      <div className="mt-6">
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Generalization · distribution shift
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {GENERALIZATION_DIMENSIONS.map((g, i) => (
            <Reveal key={g.key} delay={i * 0.06} className="group bg-surface p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl font-semibold text-paper">{g.name}</h4>
                <span className="font-mono text-[11px] text-faint">{`G${i + 1}`}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{g.description}</p>
              <div className="mt-4 h-0.5 w-8 rounded-full bg-ember/60 transition-all duration-500 group-hover:w-16" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
