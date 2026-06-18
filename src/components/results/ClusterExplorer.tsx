import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { clusterBars, generalizeBars, MODELS, type Metric } from "../../lib/results";
import { AXIS, ChartTooltip } from "./chartkit";

const TAXONOMIES = [
  { key: "mobility", label: "Operating Mode" },
  { key: "range", label: "Horizon" },
  { key: "precision", label: "Precision" },
  { key: "atomic_skill", label: "Atomic Skill" },
  { key: "scene", label: "Scene" },
  { key: "generalize", label: "Generalization" },
] as const;

type Tax = (typeof TAXONOMIES)[number]["key"];

export function ClusterExplorer({ metric, hidden }: { metric: Metric; hidden: Set<string> }) {
  const [tax, setTax] = useState<Tax>("precision");
  const data = tax === "generalize" ? generalizeBars(metric) : clusterBars(tax, metric);
  const visible = MODELS.filter((m) => !hidden.has(m.id));
  const many = data.length > 5;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {TAXONOMIES.map((t) => (
          <button
            key={t.key}
            onClick={() => setTax(t.key)}
            className={[
              "rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-all",
              tax === t.key
                ? "border-ember/50 bg-ember/15 text-ember"
                : "border-line bg-surface-2/40 text-muted hover:text-paper",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, bottom: many ? 56 : 8, left: 0 }}
          barCategoryGap={many ? "16%" : "26%"}
        >
          <CartesianGrid stroke={AXIS.grid} vertical={false} />
          <XAxis
            dataKey="category"
            tick={AXIS.tick}
            tickLine={false}
            axisLine={{ stroke: AXIS.line }}
            interval={0}
            angle={many ? -32 : 0}
            textAnchor={many ? "end" : "middle"}
            height={many ? 60 : 30}
          />
          <YAxis
            tick={AXIS.tick}
            tickLine={false}
            axisLine={false}
            width={34}
            domain={[0, "dataMax + 6"]}
          />
          <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ChartTooltip />} />
          {visible.map((m) => (
            <Bar
              key={m.id}
              dataKey={m.id}
              fill={m.color}
              radius={[3, 3, 0, 0]}
              maxBarSize={28}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
