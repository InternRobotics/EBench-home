import { taskHeatmap, MODELS, type Metric } from "../../lib/results";
import { TASKS, GROUP_ACCENT } from "../../data/tasks";

const DISPLAY = new Map(TASKS.map((t) => [t.canon, t.display]));
const GROUP = new Map(TASKS.map((t) => [t.canon, t.group]));
const ORDER = TASKS.map((t) => t.canon);

/** dark → ember ramp */
function cellColor(v: number | null): { bg: string; fg: string } {
  if (v === null || Number.isNaN(v)) return { bg: "transparent", fg: "#3a3a44" };
  const t = Math.max(0, Math.min(1, v / 100));
  const lo = [22, 22, 27];
  const hi = [241, 162, 60];
  const c = lo.map((l, i) => Math.round(l + (hi[i] - l) * Math.pow(t, 0.85)));
  return {
    bg: `rgb(${c[0]},${c[1]},${c[2]})`,
    fg: t > 0.5 ? "#15100a" : "#9a9aa6",
  };
}

export function TaskHeatmap({ metric, hidden }: { metric: Metric; hidden: Set<string> }) {
  const visible = MODELS.filter((m) => !hidden.has(m.id));
  const rows = taskHeatmap(ORDER, metric).map((r) => ({
    ...r,
    cells: r.cells.filter((c) => !hidden.has(c.model)),
  }));

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 120 + visible.length * 96 }}>
        {/* header */}
        <div
          className="grid items-end gap-1 pb-2"
          style={{ gridTemplateColumns: `170px repeat(${visible.length}, 1fr)` }}
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
            task / model
          </div>
          {visible.map((m) => (
            <div key={m.id} className="text-center text-[11px] font-medium leading-tight">
              <span style={{ color: m.color }}>{m.short}</span>
            </div>
          ))}
        </div>

        {/* rows */}
        <div className="space-y-1">
          {rows.map((r) => (
            <div
              key={r.task}
              className="grid items-center gap-1"
              style={{ gridTemplateColumns: `170px repeat(${visible.length}, 1fr)` }}
            >
              <div className="flex items-center gap-2 pr-2">
                <span
                  className="h-3 w-0.5 shrink-0 rounded-full"
                  style={{ backgroundColor: GROUP_ACCENT[GROUP.get(r.task)!] }}
                />
                <span className="truncate text-[12px] text-muted" title={DISPLAY.get(r.task)}>
                  {DISPLAY.get(r.task)}
                </span>
              </div>
              {r.cells.map((c) => {
                const { bg, fg } = cellColor(c.value);
                return (
                  <div
                    key={c.model}
                    className="grid h-8 place-items-center rounded font-mono text-[11px] tabular-nums"
                    style={{
                      backgroundColor: bg,
                      color: fg,
                      border: c.value === null ? "1px dashed #26262e" : "none",
                    }}
                    title={
                      c.value === null
                        ? "no data"
                        : `${DISPLAY.get(r.task)} · ${c.value.toFixed(1)}`
                    }
                  >
                    {c.value === null ? "·" : c.value.toFixed(0)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* legend */}
        <div className="mt-4 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
            {metric === "sr" ? "success rate" : "score"}
          </span>
          <span className="font-mono text-[10px] text-faint">0</span>
          <span
            className="h-2 w-40 rounded-full"
            style={{ background: "linear-gradient(90deg, rgb(22,22,27), rgb(241,162,60))" }}
          />
          <span className="font-mono text-[10px] text-faint">100</span>
        </div>
      </div>
    </div>
  );
}
