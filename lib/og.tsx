import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/company";

/**
 * The one social card design, shared by every opengraph-image route.
 *
 * Text only, deliberately: the renderer cannot decode WebP, which is what the
 * site photography is stored as, and a converted copy of every photo is not
 * worth carrying for a link preview.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#fafaf7";
const ACCENT = "#c8a24a";

/**
 * Pulls the display face so the card matches the site. If Google Fonts is
 * unreachable during the build we fall back to the renderer's default rather
 * than failing the whole build over a social image. Memoised: one build
 * renders a card per site and per service.
 */
let fontRequest: Promise<ArrayBuffer | null> | undefined;

function displayFont(): Promise<ArrayBuffer | null> {
  if (!fontRequest) fontRequest = loadDisplayFont();
  return fontRequest;
}

async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Archivo:wght@700", {
      headers: { "User-Agent": "Mozilla/5.0" },
    }).then((response) => response.text());

    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

type Card = {
  /** Small line above the headline, in the accent colour. */
  eyebrow?: string;
  /** Authored lines, or one string left to wrap. */
  headline: string | readonly string[];
  /** Supporting sentence under the headline. */
  detail?: string;
};

/** Longer headlines step down so they never run past two lines. */
function headlineSize(lines: readonly string[]): number {
  const longest = Math.max(...lines.map((line) => line.length));
  if (lines.length > 1 || longest <= 14) return 132;
  if (longest <= 22) return 104;
  if (longest <= 40) return 84;
  return 68;
}

export async function ogCard({ eyebrow, headline, detail }: Card): Promise<ImageResponse> {
  const font = await displayFont();
  const lines = typeof headline === "string" ? [headline] : headline;
  const fontSize = headlineSize(lines);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 72,
          color: INK,
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="34" height="40" viewBox="0 0 27 32" fill="none">
            <rect x="0" y="20" width="5" height="12" fill={INK} opacity="0.45" />
            <rect x="7.33" y="14" width="5" height="18" fill={INK} opacity="0.65" />
            <rect x="14.67" y="7" width="5" height="25" fill={INK} opacity="0.85" />
            <rect x="22" y="0" width="5" height="13" fill={ACCENT} />
            <rect x="22" y="15" width="5" height="17" fill={ACCENT} />
          </svg>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            Fangrove
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ACCENT,
                marginBottom: 28,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize,
              fontWeight: 700,
              lineHeight: lines.length > 1 ? 0.9 : 0.98,
              letterSpacing: "-0.045em",
              display: "flex",
              flexDirection: "column",
              maxWidth: 1056,
            }}
          >
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          {/* Satori requires a single text child unless display is explicit,
              so callers assemble the sentence in JS rather than in JSX. */}
          {detail && (
            <div style={{ marginTop: 34, fontSize: 27, color: "#a8a69e", maxWidth: 1056 }}>
              {detail}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            fontSize: 20,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#82807a",
            borderTop: "1px solid rgba(250,250,247,0.14)",
            paddingTop: 26,
          }}
        >
          <span style={{ color: ACCENT }}>Lahore, Pakistan</span>
          <span>·</span>
          <span>{new URL(siteConfig.url).host}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      ...(font
        ? { fonts: [{ name: "Archivo", data: font, weight: 700 as const, style: "normal" as const }] }
        : {}),
    },
  );
}
