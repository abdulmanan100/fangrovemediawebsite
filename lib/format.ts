/** Shared formatters. Keep every number on the site consistent. */

/** 1_240_000 → "1.24M" · 84_000 → "84K" */
export function compactNumber(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `${m >= 10 ? Math.round(m) : m.toFixed(2).replace(/\.?0+$/, "")}M`;
  }
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(value);
}

/** 1240000 → "1,240,000" */
export function groupedNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** 40 × 20 → "40 × 20 ft" */
export function dimensions(widthFt: number, heightFt: number): string {
  return `${widthFt} × ${heightFt} ft`;
}

/** 640 → "640 m" · 2380 → "2.4 km" */
export function distance(metres: number): string {
  if (metres < 1_000) return `${Math.round(metres / 10) * 10} m`;
  return `${(metres / 1_000).toFixed(1)} km`;
}

/** Total face area, used for sorting and for the print-cost intuition. */
export function areaSqFt(widthFt: number, heightFt: number): number {
  return widthFt * heightFt;
}

/** "01", "02" … used for section index numerals. */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Build a pre-filled mailto: link. The site has no form backend by design. */
export function mailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
