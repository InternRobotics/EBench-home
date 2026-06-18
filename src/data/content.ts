export const PAPER = {
  title: "EBench: Elemental Diagnosis of Generalist Mobile Manipulation Policies",
  shortTitle: "EBench",
  venue: "Preprint · 2026",
  arxivId: "2606.18239",
  abstract:
    "We present EBench, a simulation benchmark that diagnoses generalist mobile manipulation policies beyond a single success-rate scalar. EBench comprises 26 diverse and challenging manipulation tasks annotated along 5 capability dimensions and 4 generalization dimensions. We evaluate state-of-the-art generalist manipulation models including π₀, π₀.₅, XVLA, and InternVLA-A1, and reveal that models with near success rates exhibit strikingly different capability profiles: π₀.₅ achieves the highest test success rate and the best train–test retention, whereas InternVLA-A1 dominates mobile manipulation but collapses on dexterous tasks, and XVLA exhibits strengths on a disjoint set of atomic skills compared to other policies. Beyond capability profiling, EBench analyzes the generalization ability from 4 representative perspectives, identifying the impact of different distribution shift factors. The results reveal strengths and weaknesses of models behind an overall score. We hope this benchmark offers a broad set of diagnostic signals to guide iteration on generalist manipulation models.",
} as const;

export const AUTHORS: { name: string; first?: boolean; corresponding?: boolean }[] = [
  { name: "Ning Gao", first: true },
  { name: "Jinliang Zheng" },
  { name: "Xing Gao" },
  { name: "Haoxiang Ma" },
  { name: "Hanqing Wang", corresponding: true },
  { name: "Yukai Wang" },
  { name: "Jiantong Chen" },
  { name: "Zanxin Chen" },
  { name: "Shujie Zhang" },
  { name: "Mingda Jia" },
  { name: "Xuekun Jiang" },
  { name: "Zihou Zhu" },
  { name: "Xinyu Li" },
  { name: "Shuai Wang" },
  { name: "Hao Li" },
  { name: "Wenzhe Cai" },
  { name: "Yuqiang Yang" },
  { name: "Xudong Xu" },
  { name: "Zhaoyang Lyu" },
  { name: "Yao Mu" },
  { name: "Tai Wang" },
  { name: "Jiangmiao Pang" },
  { name: "Jia Zeng" },
  { name: "Weinan Zhang" },
  { name: "Chunhua Shen" },
];

export const AFFILIATION = "InternRobotics · Shanghai AI Laboratory and collaborators";

export type LinkItem = {
  label: string;
  href: string;
  icon: "arxiv" | "doc" | "github" | "data";
  primary?: boolean;
};

export const LINKS: LinkItem[] = [
  { label: "arXiv", href: "https://arxiv.org/abs/2606.18239", icon: "arxiv", primary: true },
  { label: "Docs", href: "https://internrobotics.github.io/EBench-doc/", icon: "doc", primary: true },
  { label: "Code", href: "https://github.com/InternRobotics/GenManip", icon: "github" },
  { label: "Dataset", href: "https://huggingface.co/datasets/InternRobotics/EBench-Dataset", icon: "data" },
];

export const RESOURCE_LINKS: LinkItem[] = [
  { label: "arXiv", href: "https://arxiv.org/abs/2606.18239", icon: "arxiv" },
  { label: "Documentation", href: "https://internrobotics.github.io/EBench-doc/", icon: "doc" },
  { label: "Server code · GenManip", href: "https://github.com/InternRobotics/GenManip", icon: "github" },
  { label: "Client · genmanip-client", href: "https://github.com/InternRobotics/genmanip-client", icon: "github" },
  { label: "Assets · HuggingFace", href: "https://huggingface.co/datasets/InternRobotics/EBench-Assets", icon: "data" },
  { label: "Dataset · HuggingFace", href: "https://huggingface.co/datasets/InternRobotics/EBench-Dataset", icon: "data" },
];

export const BIBTEX = `@article{gao2026ebench,
  title   = {EBench: Elemental Diagnosis of Generalist Mobile Manipulation Policies},
  author  = {Gao, Ning and Zheng, Jinliang and Gao, Xing and Ma, Haoxiang and
             Wang, Hanqing and Wang, Yukai and Chen, Jiantong and Chen, Zanxin and
             Zhang, Shujie and Jia, Mingda and Jiang, Xuekun and Zhu, Zihou and
             Li, Xinyu and Wang, Shuai and Li, Hao and Cai, Wenzhe and Yang, Yuqiang and
             Xu, Xudong and Lyu, Zhaoyang and Mu, Yao and Wang, Tai and Pang, Jiangmiao and
             Zeng, Jia and Zhang, Weinan and Shen, Chunhua},
  journal = {arXiv preprint arXiv:2606.18239},
  year    = {2026}
}`;

/* ---- Headline numbers used in the hero / overview ---- */
export const HEADLINE_STATS = [
  { value: "26", label: "manipulation tasks", note: "long-horizon · dexterous · mobile" },
  { value: "5", label: "capability dimensions", note: "mode · range · precision · skill · scene" },
  { value: "4", label: "generalization axes", note: "background · object · instruction · mix" },
  { value: "3", label: "camera views", note: "left wrist · head · right wrist" },
];

/* ---- The 5 capability dimensions ---- */
export const CAPABILITY_DIMENSIONS = [
  {
    key: "mobility",
    index: "01",
    name: "Operating Mode",
    tagline: "Mobile base vs. fixed table-top",
    description:
      "Whether the policy must coordinate a moving base with the arms, or operate from a fixed table-top setup. Mobile tasks add navigation and whole-body coordination on top of manipulation.",
    buckets: ["Mobile", "Fixed"],
    accent: "#75CFB8",
  },
  {
    key: "range",
    index: "02",
    name: "Horizon",
    tagline: "Short vs. long-horizon chains",
    description:
      "The temporal length of a task. Long-horizon tasks chain many sub-goals — make a sandwich, load a dishwasher — and punish error accumulation across the rollout.",
    buckets: ["Short Horizon", "Long Horizon"],
    accent: "#9381FF",
  },
  {
    key: "precision",
    index: "03",
    name: "Precision",
    tagline: "Low · Medium · High tolerance",
    description:
      "How tight the spatial tolerance is. High-precision tasks such as peg-in-hole, gear install, and nut tightening demand sub-centimeter accuracy that coarse policies cannot reach.",
    buckets: ["Low", "Medium", "High"],
    accent: "#F1A23C",
  },
  {
    key: "atomic_skill",
    index: "04",
    name: "Atomic Skill",
    tagline: "11 primitive verbs",
    description:
      "Each task decomposes into primitive verbs. Per-step skill observations isolate which motions a policy has actually mastered, independent of the full-task outcome.",
    buckets: ["Grasp", "Place", "Move", "Pull", "Push", "Press", "Sweep", "Flip", "Handover", "Insert", "Pour"],
    accent: "#FF8FA3",
  },
  {
    key: "scene",
    index: "05",
    name: "Scene",
    tagline: "9 indoor environments",
    description:
      "Tasks are situated across nine realistic indoor scenes — kitchen, bathroom, study, industrial bench, supermarket and more — testing robustness to visual and spatial context.",
    buckets: [
      "Kitchen",
      "Bathroom",
      "Bedroom",
      "Living Room",
      "Study",
      "Dining Room",
      "Industrial",
      "Logistics",
      "Supermarket",
    ],
    accent: "#FFD670",
  },
] as const;

/* ---- The 4 generalization dimensions ---- */
export const GENERALIZATION_DIMENSIONS = [
  {
    key: "Background",
    name: "Background",
    description: "Unseen scene backgrounds and lighting while objects and instructions stay familiar.",
  },
  {
    key: "Object",
    name: "Object",
    description: "Novel object instances, appearances, and placements not seen during training.",
  },
  {
    key: "Instruction",
    name: "Instruction",
    description: "Re-phrased or unseen natural-language instructions for the same underlying goal.",
  },
  {
    key: "Mix",
    name: "Mix",
    description: "Simultaneous shifts across background, object, and instruction — the hardest setting.",
  },
] as const;
