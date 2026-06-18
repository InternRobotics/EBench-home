/** Resolve a path under the configured Vite base (works on GitHub Pages sub-paths). */
export const asset = (p: string): string =>
  import.meta.env.BASE_URL + p.replace(/^\//, "");

/** True for absolute / external URLs. */
export const isExternal = (href: string): boolean => /^https?:\/\//.test(href);
