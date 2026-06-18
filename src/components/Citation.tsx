import { useState } from "react";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { BIBTEX } from "../data/content";
import { CopyIcon, CheckIcon } from "../lib/icons";

export function Citation() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BIBTEX);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Section
      id="cite"
      index="05"
      eyebrow="Citation"
      title={<>Cite EBench</>}
      intro="If EBench is useful in your research, please cite the paper. Update the entry once the camera-ready / venue is final."
    >
      <Reveal>
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-line bg-surface-2/50 px-5 py-3">
            <span className="font-mono text-[12px] tracking-wide text-faint">BibTeX</span>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[12px] text-muted transition-colors hover:border-ember/50 hover:text-paper"
            >
              {copied ? (
                <>
                  <CheckIcon width={13} height={13} className="text-ember" /> Copied
                </>
              ) : (
                <>
                  <CopyIcon width={13} height={13} /> Copy
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-paper/85">
            <code>{BIBTEX}</code>
          </pre>
        </div>
      </Reveal>
    </Section>
  );
}
