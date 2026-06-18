import { useMemo, useState } from "react";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { LoopVideo } from "./ui/LoopVideo";
import {
  TASKS,
  VIEWS,
  GROUP_LABEL,
  GROUP_SHORT,
  GROUP_ACCENT,
  type TaskGroup,
} from "../data/tasks";

type Filter = "all" | TaskGroup;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All 26" },
  { key: "long_horizon", label: GROUP_SHORT.long_horizon },
  { key: "simple_pnp", label: GROUP_SHORT.simple_pnp },
  { key: "teleop", label: GROUP_SHORT.teleop },
];

export function TaskGallery() {
  const [filter, setFilter] = useState<Filter>("all");

  const tasks = useMemo(
    () => (filter === "all" ? TASKS : TASKS.filter((t) => t.group === filter)),
    [filter]
  );

  return (
    <Section
      id="tasks"
      index="03"
      eyebrow="Task showcase"
      title={
        <>
          Every task, from <span className="text-ember">three viewpoints</span>.
        </>
      }
      intro="All 26 tasks captured from the left-wrist, head, and right-wrist cameras — the exact multi-view observation a policy receives. Hover any card to pause; clips play sped-up while in view."
    >
      {/* filter bar */}
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.key;
            const accent = f.key === "all" ? "#F1A23C" : GROUP_ACCENT[f.key as TaskGroup];
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={[
                  "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-all",
                  on ? "text-ink" : "border-line bg-surface-2/50 text-muted hover:text-paper",
                ].join(" ")}
                style={on ? { backgroundColor: accent, borderColor: accent } : undefined}
              >
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[12px] text-faint">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.map((t, i) => {
          const accent = GROUP_ACCENT[t.group];
          return (
            <Reveal key={t.canon} delay={(i % 3) * 0.05} className="group">
              <article className="panel overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-soft hover:shadow-glow">
                {/* triptych */}
                <div className="grid grid-cols-3 gap-px bg-line">
                  {VIEWS.map((v) => (
                    <div key={v.key} className="relative aspect-[4/3] bg-black">
                      <LoopVideo
                        src={`videos/${t.canon}_${v.key}.mp4`}
                        rate={3}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-1.5 top-1.5 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white/75 backdrop-blur-sm">
                        {v.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* meta */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10.5px] tracking-widest text-faint">
                      TASK {String(TASKS.indexOf(t) + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                      style={{
                        color: accent,
                        backgroundColor: `${accent}18`,
                        border: `1px solid ${accent}33`,
                      }}
                    >
                      {GROUP_SHORT[t.group]}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-paper">{t.display}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[13px] italic leading-relaxed text-muted">
                    “{t.instruction}”
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <p className="mt-8 text-center font-mono text-[12px] text-faint">
          Grouped by{" "}
          {(["long_horizon", "simple_pnp", "teleop"] as TaskGroup[]).map((g, i) => (
            <span key={g}>
              <span style={{ color: GROUP_ACCENT[g] }}>{GROUP_LABEL[g].toLowerCase()}</span>
              {i < 2 ? " · " : ""}
            </span>
          ))}
        </p>
      </Reveal>
    </Section>
  );
}
