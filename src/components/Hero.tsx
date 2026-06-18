import { motion } from "framer-motion";
import { AUTHORS, AFFILIATION, PAPER, LINKS, HEADLINE_STATS } from "../data/content";
import { LinkButton } from "./ui/LinkButton";
import { LoopVideo } from "./ui/LoopVideo";

const MARQUEE = [
  "make_sandwich_top",
  "peg_in_hole_top",
  "dishwasher_top",
  "flip_cup_collect_cookies_top",
  "tighten_nut_top",
  "fruit_top",
  "collect_coffee_beans_top",
  "shop_top",
  "install_gear_top",
  "microwave_top",
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="wrap relative">
        {/* eyebrow chips */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-2"
        >
          <span className="chip border-ember/30 text-ember">
            <span className="h-1.5 w-1.5 animate-ticker rounded-full bg-ember" />
            Simulation benchmark
          </span>
          <span className="chip">NVIDIA Isaac Sim</span>
          <span className="chip">{PAPER.venue}</span>
        </motion.div>

        {/* wordmark + title */}
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-7 font-display text-[19vw] font-semibold leading-[0.86] tracking-tightest text-paper sm:text-[10rem]"
        >
          EBench
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 max-w-3xl text-balance font-display text-2xl font-medium leading-[1.15] text-paper/90 sm:text-[2rem]"
        >
          Elemental Diagnosis of Generalist Mobile Manipulation Policies
        </motion.p>

        <motion.p
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted"
        >
          A simulation benchmark that looks past a single success-rate scalar — diagnosing
          generalist VLA policies across <span className="text-paper">26 tasks</span>,{" "}
          <span className="text-paper">5 capability dimensions</span>, and{" "}
          <span className="text-paper">4 generalization axes</span>.
        </motion.p>

        {/* authors */}
        <motion.div custom={4} variants={fade} initial="hidden" animate="show" className="mt-8">
          <p className="max-w-3xl text-[14px] leading-relaxed text-paper/80">
            {AUTHORS.map((a, i) => (
              <span key={a.name}>
                <span className={a.first ? "font-semibold text-paper" : ""}>{a.name}</span>
                {a.corresponding && <sup className="text-ember">✦</sup>}
                {i < AUTHORS.length - 1 && <span className="text-faint">, </span>}
              </span>
            ))}
          </p>
          <p className="mt-2 font-mono text-[12px] tracking-wide text-faint">
            {AFFILIATION} <span className="text-ember">✦</span> corresponding author
          </p>
        </motion.div>

        {/* links */}
        <motion.div
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {LINKS.map((l) => (
            <LinkButton key={l.label} {...l} />
          ))}
        </motion.div>

        {/* diagnostic readout */}
        <motion.div
          custom={6}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
        >
          {HEADLINE_STATS.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-6">
              <div className="font-display text-4xl font-semibold text-ember">{s.value}</div>
              <div className="mt-1.5 text-[13px] font-medium text-paper">{s.label}</div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-wide text-faint">
                {s.note}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* full-bleed video marquee */}
      <motion.div
        custom={7}
        variants={fade}
        initial="hidden"
        animate="show"
        className="relative mt-16 overflow-hidden border-y border-line py-4"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((name, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] w-56 shrink-0 overflow-hidden rounded-lg border border-line bg-black"
            >
              <LoopVideo
                src={`videos/${name}.mp4`}
                rate={3}
                className="h-full w-full object-cover opacity-90"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
