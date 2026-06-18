import { ICONS, ArrowUpRight } from "../../lib/icons";
import { asset, isExternal } from "../../lib/asset";

interface LinkButtonProps {
  label: string;
  href: string;
  icon: keyof typeof ICONS;
  primary?: boolean;
}

export function LinkButton({ label, href, icon, primary }: LinkButtonProps) {
  const Icon = ICONS[icon];
  const external = isExternal(href);
  const resolved = external ? href : asset(href);

  return (
    <a
      href={resolved}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={[
        "group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
        primary
          ? "bg-ember text-ink shadow-glow hover:bg-ember-bright hover:-translate-y-0.5"
          : "border border-line bg-surface-2/60 text-paper hover:border-ember/50 hover:bg-surface-3 hover:-translate-y-0.5",
      ].join(" ")}
    >
      <Icon className={primary ? "text-ink" : "text-ember"} width={16} height={16} />
      {label}
      <ArrowUpRight
        width={13}
        height={13}
        className="opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
