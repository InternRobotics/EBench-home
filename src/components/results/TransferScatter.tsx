import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { transferScatter, shortOf, type Metric } from "../../lib/results";
import { AXIS } from "./chartkit";

interface Pt {
  id: string;
  name: string;
  color: string;
  paper: boolean;
  x: number;
  y: number;
  retention: number | null;
}

function ScatterTip({ active, payload }: { active?: boolean; payload?: { payload: Pt }[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-line bg-ink/95 px-3 py-2.5 shadow-xl backdrop-blur">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-paper">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
        {shortOf(p.id)}
      </div>
      <div className="mt-1.5 space-y-0.5 font-mono text-[11.5px] text-muted">
        <div>Val-Train · {p.x.toFixed(1)}</div>
        <div>Test · {p.y.toFixed(1)}</div>
        {p.retention !== null && (
          <div className="text-ember">retention · {p.retention.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
}

export function TransferScatter({ metric, hidden }: { metric: Metric; hidden: Set<string> }) {
  const all = transferScatter(metric) as Pt[];
  const data = all.filter((d) => !hidden.has(d.id));
  const max =
    Math.ceil(Math.max(10, ...all.flatMap((d) => [d.x, d.y])) / 5) * 5 + 5;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ScatterChart margin={{ top: 16, right: 22, bottom: 26, left: 4 }}>
        <CartesianGrid stroke={AXIS.grid} strokeDasharray="2 4" />
        <XAxis
          type="number"
          dataKey="x"
          domain={[0, max]}
          tick={AXIS.tick}
          tickLine={false}
          axisLine={{ stroke: AXIS.line }}
          label={{
            value: "Validation-Train →",
            position: "insideBottom",
            offset: -14,
            fill: "#9A9AA6",
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
          }}
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={[0, max]}
          tick={AXIS.tick}
          tickLine={false}
          axisLine={{ stroke: AXIS.line }}
          label={{
            value: "Test ↑",
            angle: -90,
            position: "insideLeft",
            offset: 16,
            fill: "#9A9AA6",
            fontSize: 11,
            fontFamily: "JetBrains Mono, monospace",
          }}
        />
        <ZAxis range={[140, 140]} />
        <ReferenceLine
          segment={[
            { x: 0, y: 0 },
            { x: max, y: max },
          ]}
          stroke="#4A4A55"
          strokeDasharray="5 5"
          ifOverflow="hidden"
        />
        <Tooltip content={<ScatterTip />} cursor={{ strokeDasharray: "3 3", stroke: "#3a3a45" }} />
        <Scatter data={data} isAnimationActive={false}>
          {data.map((d) => (
            <Cell key={d.id} fill={d.color} stroke="#09090B" strokeWidth={1.5} />
          ))}
          <LabelList
            dataKey="name"
            position="top"
            offset={9}
            style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", fill: "#C8C8D0" }}
          />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
