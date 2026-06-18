import type { ReactNode } from "react";
import { MODELS, shortOf, colorOf, type Metric } from "../../lib/results";

export const AXIS = {
  tick: { fill: "#9A9AA6", fontSize: 11, fontFamily: "JetBrains Mono, monospace" },
  grid: "#23232B",
  line: "#33333D",
};

export const METRIC_LABEL: Record<Metric, string> = {
  sr: "Success rate",
  score: "Score",
};

/* ---- Panel wrapper ---- */
export function ChartCard({
  title,
  subtitle,
  children,
  toolbar,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  toolbar?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`panel p-5 sm:p-6 ${className ?? ""}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-paper">{title}</h3>
          {subtitle && <p className="mt-1 text-[13px] leading-snug text-muted">{subtitle}</p>}
        </div>
        {toolbar}
      </div>
      {children}
    </div>
  );
}

/* ---- Metric (SR / Score) segmented toggle ---- */
export function MetricToggle({
  value,
  onChange,
}: {
  value: Metric;
  onChange: (m: Metric) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-line bg-surface-2/60 p-0.5 font-mono text-[12px]">
      {(["sr", "score"] as Metric[]).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={[
            "rounded-full px-3 py-1 transition-colors",
            value === m ? "bg-ember text-ink" : "text-muted hover:text-paper",
          ].join(" ")}
        >
          {m === "sr" ? "SR" : "Score"}
        </button>
      ))}
    </div>
  );
}

/* ---- Model legend with visibility toggles ---- */
export function ModelLegend({
  hidden,
  onToggle,
}: {
  hidden: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {MODELS.map((m) => {
        const off = hidden.has(m.id);
        return (
          <button
            key={m.id}
            onClick={() => onToggle(m.id)}
            title={m.note}
            className={[
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] transition-all",
              off
                ? "border-line bg-transparent text-faint opacity-50"
                : "border-line bg-surface-2/70 text-paper",
            ].join(" ")}
          >
            <span
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                backgroundColor: off ? "transparent" : m.color,
                boxShadow: off ? "none" : `0 0 8px ${m.color}`,
                border: off ? `1.5px solid ${m.color}` : "none",
              }}
            />
            {m.short}
            {!m.paper && <span className="text-[9px] text-ember">live</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Shared dark tooltip ---- */
interface TipPayload {
  dataKey?: string | number;
  name?: string | number;
  value?: number;
  color?: string;
  payload?: Record<string, unknown>;
}
export function ChartTooltip({
  active,
  payload,
  label,
  unit = "",
}: {
  active?: boolean;
  payload?: TipPayload[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const rows = [...payload]
    .filter((p) => Number.isFinite(p.value as number))
    .sort((a, b) => (b.value as number) - (a.value as number));
  return (
    <div className="rounded-lg border border-line bg-ink/95 px-3 py-2.5 shadow-xl backdrop-blur">
      {label !== undefined && (
        <div className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-faint">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {rows.map((p, i) => {
          const id = String(p.dataKey ?? p.name ?? "");
          return (
            <div key={i} className="flex items-center justify-between gap-4 text-[12.5px]">
              <span className="flex items-center gap-1.5 text-paper">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: p.color ?? colorOf(id) }}
                />
                {shortOf(id)}
              </span>
              <span className="font-mono tabular-nums text-paper">
                {(p.value as number).toFixed(1)}
                {unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
