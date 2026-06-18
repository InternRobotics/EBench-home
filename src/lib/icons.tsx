// Icons sourced from `react-icons`:
//  · Simple Icons (brand logos) — real arXiv, GitHub, Hugging Face marks
//  · Lucide (generic UI icons) — arrows, copy, check, play, docs
import { SiArxiv, SiGithub, SiHuggingface } from "react-icons/si";
import {
  LuArrowUpRight,
  LuArrowDown,
  LuCopy,
  LuCheck,
  LuPlay,
  LuBookOpen,
} from "react-icons/lu";

// Brand logos
export const ArxivIcon = SiArxiv;
export const GithubIcon = SiGithub;
export const DataIcon = SiHuggingface; // datasets are hosted on Hugging Face

// UI icons
export const DocIcon = LuBookOpen;
export const ArrowUpRight = LuArrowUpRight;
export const ArrowDown = LuArrowDown;
export const CopyIcon = LuCopy;
export const CheckIcon = LuCheck;
export const PlayIcon = LuPlay;

/** Lookup used by data-driven link lists. */
export const ICONS = {
  arxiv: ArxivIcon,
  doc: DocIcon,
  github: GithubIcon,
  data: DataIcon,
} as const;
