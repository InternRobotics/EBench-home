import { useState } from "react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import type { Metric } from "../../lib/results";
import { ChartCard, MetricToggle, ModelLegend } from "./chartkit";
import { TopLineBars } from "./TopLineBars";
import { CapabilityRadar } from "./CapabilityRadar";
import { TransferScatter } from "./TransferScatter";
import { ClusterExplorer } from "./ClusterExplorer";
import { TaskHeatmap } from "./TaskHeatmap";

export function ResultsSection() {
  const [metric, setMetric] = useState<Metric>("sr");
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setHidden((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <Section
      id="results"
      index="04"
      eyebrow="Diagnosis"
      title={
        <>
          The same overall score, <span className="text-ember">different policies</span>.
        </>
      }
      intro="A live snapshot of the EBench leaderboard. The four paper baselines (π₀, π₀.₅, XVLA, InternVLA-A1) are shown alongside two later community submissions. Toggle metric and models — the diagnostic profile shifts dramatically even where headline numbers agree."
    >
      {/* shared controls */}
      <Reveal>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/50 p-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
              Metric
            </span>
            <MetricToggle value={metric} onChange={setMetric} />
          </div>
          <ModelLegend hidden={hidden} onToggle={toggle} />
        </div>
      </Reveal>

      {/* top-line */}
      <Reveal>
        <ChartCard
          title="Top-line · Test split"
          subtitle="Mean success rate and score across seeds, ranked. Qwen-RobotManip sets the ceiling; π₀.₅ leads the four paper baselines."
        >
          <TopLineBars />
        </ChartCard>
      </Reveal>

      {/* radar + scatter */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <ChartCard
            title="Capability fingerprint"
            subtitle="Per-model profile across operating mode, horizon and precision (Test split)."
          >
            <CapabilityRadar metric={metric} hidden={hidden} />
          </ChartCard>
        </Reveal>
        <Reveal delay={0.08}>
          <ChartCard
            title="Train → Test transfer"
            subtitle="Validation-Train vs Test. Points under the y=x diagonal memorize faster than they transfer."
          >
            <TransferScatter metric={metric} hidden={hidden} />
          </ChartCard>
        </Reveal>
      </div>

      {/* cluster explorer */}
      <Reveal>
        <ChartCard
          className="mt-6"
          title="Cluster breakdown"
          subtitle="Slice the Test split by any capability dimension or generalization axis."
        >
          <ClusterExplorer metric={metric} hidden={hidden} />
        </ChartCard>
      </Reveal>

      {/* heatmap */}
      <Reveal>
        <ChartCard
          className="mt-6"
          title="Per-task breakdown"
          subtitle="All 26 tasks × models. Complementary strengths are visible task-by-task — no single policy wins everywhere."
        >
          <TaskHeatmap metric={metric} hidden={hidden} />
        </ChartCard>
      </Reveal>
    </Section>
  );
}
