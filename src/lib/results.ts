import raw from "../data/ebench.json";

/* ------------------------------------------------------------------ *
 * Raw data shapes (from the EBench v0.2 leaderboard analysis dump)
 * ------------------------------------------------------------------ */
interface Stat {
  mean: number;
  std: number;
  n: number;
  values?: number[];
}
interface ClusterStat {
  sr_mean: number;
  sr_std: number;
  score_mean: number;
  score_std: number;
  n: number;
}
type Split = "val_train" | "val_unseen" | "test_mini";

interface RawData {
  models: string[];
  agg_top: Record<string, Record<string, Stat>>;
  agg_task: Record<string, Record<Split, Record<string, ClusterStat>>>;
  agg_cluster: Record<string, Record<Split, Record<string, Record<string, ClusterStat>>>>;
  agg_generalize: Record<string, Record<string, Record<string, Stat>>>;
  cluster_map: Record<string, Record<string, string[]>>;
}

const P = raw as unknown as RawData;

/* ------------------------------------------------------------------ *
 * Model registry
 * ------------------------------------------------------------------ */
export interface ModelMeta {
  id: string; // key in the data
  short: string; // display label
  color: string;
  paper: boolean; // one of the 4 baselines in the paper
  note: string;
}

export const MODELS: ModelMeta[] = [
  { id: "Pi0-200k", short: "π₀", color: "#9381FF", paper: true, note: "200K · n=3 seeds" },
  { id: "Pi0.5-200k", short: "π₀.₅", color: "#FF8FA3", paper: true, note: "200K · n=3 seeds" },
  { id: "XVLA-200k", short: "XVLA", color: "#FFD670", paper: true, note: "200K · n=4 seeds" },
  { id: "InternVLA-A1-200k", short: "InternVLA-A1", color: "#75CFB8", paper: true, note: "200K · n=3 seeds" },
  { id: "LingBot-VA", short: "LingBot-VA", color: "#34D27B", paper: false, note: "58K · live submission" },
  { id: "Qwen-RobotManip", short: "Qwen-RobotManip", color: "#F97316", paper: false, note: "Test split only" },
];

export const PAPER_MODELS = MODELS.filter((m) => m.paper);

const byId = new Map(MODELS.map((m) => [m.id, m]));
export const colorOf = (id: string) => byId.get(id)?.color ?? "#9A9AA6";
export const shortOf = (id: string) => byId.get(id)?.short ?? id;

/* ------------------------------------------------------------------ *
 * Top-line numbers
 * ------------------------------------------------------------------ */
export type Metric = "sr" | "score";

export interface TopRow {
  id: string;
  short: string;
  color: string;
  paper: boolean;
  test: number; // test_mini
  mobile: number;
  tabletop: number;
  valTrain: number;
  score: number; // test_mini score
}

export function topLine(): TopRow[] {
  return MODELS.map((m) => {
    const t = P.agg_top[m.id] ?? {};
    return {
      id: m.id,
      short: m.short,
      color: m.color,
      paper: m.paper,
      test: t.tm_sr?.mean ?? NaN,
      mobile: t.mobile_manip_sr?.mean ?? NaN,
      tabletop: t.table_top_manip_sr?.mean ?? NaN,
      valTrain: t.vt_sr?.mean ?? NaN,
      score: t.tm_score?.mean ?? NaN,
    };
  });
}

/** Headline test SR / Score bars, ranked. */
export function topLineBars(metric: Metric) {
  const key = metric === "sr" ? "tm_sr" : "tm_score";
  return MODELS.map((m) => ({
    id: m.id,
    name: m.short,
    color: m.color,
    paper: m.paper,
    value: round(P.agg_top[m.id]?.[key]?.mean),
  }))
    .filter((d) => Number.isFinite(d.value))
    .sort((a, b) => (b.value as number) - (a.value as number));
}

/* ------------------------------------------------------------------ *
 * Capability radar (test split)
 * ------------------------------------------------------------------ */
const RADAR_AXES: { axis: string; tax: string; cat: string }[] = [
  { axis: "Mobile", tax: "mobility", cat: "Mobile" },
  { axis: "Fixed", tax: "mobility", cat: "Fixed" },
  { axis: "Short-H", tax: "range", cat: "Short Horizon" },
  { axis: "Long-H", tax: "range", cat: "Long Horizon" },
  { axis: "Prec·Low", tax: "precision", cat: "Low" },
  { axis: "Prec·Med", tax: "precision", cat: "Medium" },
  { axis: "Prec·High", tax: "precision", cat: "High" },
];

/** Returns recharts-friendly rows: one per axis, with a column per model. */
export function capabilityRadar(metric: Metric = "sr") {
  const key = metric === "sr" ? "sr_mean" : "score_mean";
  return RADAR_AXES.map(({ axis, tax, cat }) => {
    const row: Record<string, number | string> = { axis };
    for (const m of MODELS) {
      const v = P.agg_cluster[m.id]?.test_mini?.[tax]?.[cat]?.[key];
      if (Number.isFinite(v)) row[m.id] = round(v) as number;
    }
    return row;
  });
}

/* ------------------------------------------------------------------ *
 * Train → Test transfer scatter
 * ------------------------------------------------------------------ */
export function transferScatter(metric: Metric = "sr") {
  const vtKey = metric === "sr" ? "vt_sr" : "vt_score";
  const tmKey = metric === "sr" ? "tm_sr" : "tm_score";
  return MODELS.map((m) => {
    const t = P.agg_top[m.id] ?? {};
    return {
      id: m.id,
      name: m.short,
      color: m.color,
      paper: m.paper,
      x: round(t[vtKey]?.mean),
      y: round(t[tmKey]?.mean),
      retention:
        t[vtKey]?.mean && t[tmKey]?.mean ? +(t[tmKey]!.mean / t[vtKey]!.mean).toFixed(2) : null,
    };
  }).filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
}

/* ------------------------------------------------------------------ *
 * Cluster breakdowns (grouped bars)
 * ------------------------------------------------------------------ */
export function clusterOrder(tax: string): string[] {
  // Preserve a meaningful order rather than alphabetical.
  const manual: Record<string, string[]> = {
    mobility: ["Mobile", "Fixed"],
    range: ["Short Horizon", "Long Horizon"],
    precision: ["Low", "Medium", "High"],
  };
  if (manual[tax]) return manual[tax];
  return Object.keys(P.cluster_map[tax] ?? {});
}

export function clusterBars(tax: string, metric: Metric, split: Split = "test_mini") {
  const key = metric === "sr" ? "sr_mean" : "score_mean";
  return clusterOrder(tax).map((cat) => {
    const row: Record<string, number | string> = { category: cat };
    for (const m of MODELS) {
      const v = P.agg_cluster[m.id]?.[split]?.[tax]?.[cat]?.[key];
      if (Number.isFinite(v)) row[m.id] = round(v) as number;
    }
    return row;
  });
}

export const ATOMIC_SKILLS = Object.keys(P.cluster_map.atomic_skill ?? {});
export const SCENES = Object.keys(P.cluster_map.scene ?? {});

/* ------------------------------------------------------------------ *
 * Generalization dimensions
 * ------------------------------------------------------------------ */
const GEN_DIMS = ["Background", "Object", "Instruction", "Mix"];

export function generalizeBars(metric: Metric, split: Split = "test_mini") {
  const part = split === "test_mini" ? "test_mini" : split;
  const key = metric === "sr" ? `${part}_success_rate` : `${part}_score`;
  return GEN_DIMS.map((dim) => {
    const row: Record<string, number | string> = { category: dim };
    for (const m of MODELS) {
      const v = P.agg_generalize[m.id]?.[key]?.[dim]?.mean;
      if (Number.isFinite(v)) row[m.id] = round(v) as number;
    }
    return row;
  });
}

/* ------------------------------------------------------------------ *
 * Per-task heatmap (tasks × models)
 * ------------------------------------------------------------------ */
export interface HeatCell {
  model: string;
  value: number | null;
}
export interface HeatRow {
  task: string;
  cells: HeatCell[];
}

export function taskHeatmap(
  taskOrder: string[],
  metric: Metric = "sr",
  split: Split = "test_mini"
): HeatRow[] {
  const key = metric === "sr" ? "sr_mean" : "score_mean";
  return taskOrder.map((task) => ({
    task,
    cells: MODELS.map((m) => {
      const v = P.agg_task[m.id]?.[split]?.[task]?.[key];
      return { model: m.id, value: Number.isFinite(v) ? round(v) : null };
    }),
  }));
}

/* ------------------------------------------------------------------ */
function round(v: number | undefined): number {
  return v === undefined || v === null || Number.isNaN(v) ? NaN : Math.round(v * 10) / 10;
}
