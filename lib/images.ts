/**
 * Central image registry.
 *
 * Every image on the site resolves through this file, so swapping placeholder
 * stock for real Fangrove photography is a single-file edit — no hunting
 * through components. See ASSETS.md for the shot list.
 *
 * Selection rules applied here, and worth keeping when these are replaced:
 *   · No legible third-party brand names. An OOH company's own site should not
 *     be advertising Wendy's, Samsung or a whisky brand for free.
 *   · No obviously non-Pakistani landmarks in primary positions.
 *   · Dark and low-saturation by default — the design system supplies the
 *     colour, the photography supplies the texture.
 *
 * Sources are Unsplash CDN URLs, all verified to return 200. The `w` cap keeps
 * the origin fetch small before Next's optimiser resizes again.
 */

const CDN = "https://images.unsplash.com/photo-";

function img(id: string, width = 1600): string {
  return `${CDN}${id}?auto=format&fit=crop&w=${width}&q=72`;
}

/** Shared dark blur-up placeholder. Matches --color-surface-2. */
export const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMxNjE2MTMiLz48L3N2Zz4=";

export const images = {
  // ── Out-of-home ───────────────────────────────────────────────────────
  /** Elevated carriageway, light trails, board on the facade. The hero. */
  heroCorridor: img("1676491409907-b40322daf75d", 2400),
  /** Blank billboard face against a night sky. The purest OOH image here. */
  billboardBlank: img("1633777783568-085312a3d44a"),
  /** Low-angle structure with its lighting rig. Engineering, not advertising. */
  billboardStructure: img("1687216037475-997f80aefd2b"),
  /** Illuminated panel under an overpass. Reads as a digital face. */
  digitalPanel: img("1771575518904-3e5f299a6375"),
  /** Near-black street, board in silhouette. Texture for dark sections. */
  streetNight: img("1768720406500-9a39f5f89e56"),

  // ── Print floor ───────────────────────────────────────────────────────
  /** Newsprint coming off the press, motion blur. */
  pressNewsprint: img("1503694978374-8a2fa686963a"),
  /** Inked rollers, close. */
  pressRollers: img("1758183961426-88d64eb5f787"),
  /** Sheet-fed offset unit. */
  pressOffset: img("1729944950511-e9c71556cfd4"),
  /** Production floor, wide. */
  pressFloor: img("1727517786578-ff2bb896b852"),
  /** Stock swatches. The one deliberately saturated image on the site. */
  paperStock: img("1422036306541-00138cae4dbc"),

  // ── Broadcast ─────────────────────────────────────────────────────────
  broadcastStudio: img("1671575584088-03eb2811c30f"),

  // ── Lahore & Punjab ───────────────────────────────────────────────────
  /** Minar-e-Pakistan and Badshahi through the haze. The city, unmistakably. */
  lahoreSkyline: img("1622546758596-f1f06ba11f58"),
  /** Lahore Fort at dusk. */
  lahoreFort: img("1617128072203-310a93722ad8"),
  /** Working street with rickshaws — the real audience, not the postcard. */
  lahoreStreet: img("1601969695489-f10a1da1756a"),
  /** Badshahi Mosque, daylight. */
  lahoreBadshahi: img("1603491656337-3b491147917c"),
} as const;

export type ImageKey = keyof typeof images;
