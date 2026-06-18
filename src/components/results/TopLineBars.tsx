import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { topLineBars, type Metric } from "../../lib/results";
import { AXIS, ChartTooltip } from "./chartkit";

function Panel({ metric, title }: { metric: Metric; title: string }) {
  const data = topLineBars(metric);
  return (
    <div>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">{title}</div>
      <ResponsiveContainer width="100%" height={data.length * 42 + 16}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 2, right: 36, bottom: 2, left: 4 }}
          barCategoryGap={10}
        >
          <XAxis type="number" hide domain={[0, "dataMax + 8"]} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ ...AXIS.tick, fontSize: 10.5 }}
            tickLine={false}
            axisLine={false}
            width={112}
          />
          <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ChartTooltip />} />
          <Bar dataKey="value" radius={[0, 5, 5, 0]} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.id} fill={d.color} fillOpacity={d.paper ? 0.92 : 1} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v: number) => v.toFixed(1)}
              className="fill-paper"
              style={{ fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TopLineBars() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <Panel metric="sr" title="Test · success rate (%)" />
      <Panel metric="score" title="Test · score" />
    </div>
  );
}
