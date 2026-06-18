import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { capabilityRadar, MODELS, type Metric } from "../../lib/results";
import { ChartTooltip } from "./chartkit";

export function CapabilityRadar({ metric, hidden }: { metric: Metric; hidden: Set<string> }) {
  const data = capabilityRadar(metric);
  const visible = MODELS.filter((m) => !hidden.has(m.id));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#2A2A33" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fill: "#B8B8C2", fontSize: 11, fontFamily: "JetBrains Mono, monospace" }}
        />
        <PolarRadiusAxis
          angle={90}
          tick={{ fill: "#52525C", fontSize: 9 }}
          stroke="#2A2A33"
          tickCount={5}
        />
        {visible.map((m) => (
          <Radar
            key={m.id}
            name={m.id}
            dataKey={m.id}
            stroke={m.color}
            fill={m.color}
            fillOpacity={0.08}
            strokeWidth={1.8}
            isAnimationActive={false}
            dot={{ r: 2, fill: m.color, strokeWidth: 0 }}
          />
        ))}
        <Tooltip content={<ChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
