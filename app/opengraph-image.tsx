import { ImageResponse } from "next/og";
import { company } from "@/content/company";
import { citiesCovered, totalSites } from "@/content/sites";

export const alt = `${company.name} — Out-of-Home, Broadcast & Print · Lahore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pulls the display face so the card matches the site. If Google Fonts is
 * unreachable during the build we fall back to the renderer's default rather
 * than failing the whole build over a social image.
 */
async function displayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@700",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((response) => response.text());

    const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await displayFont();

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
          color: "#fafaf7",
        }}
      >
        {/* Mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="34" height="40" viewBox="0 0 27 32" fill="none">
            <rect x="0" y="20" width="5" height="12" fill="#fafaf7" opacity="0.45" />
            <rect x="7.33" y="14" width="5" height="18" fill="#fafaf7" opacity="0.65" />
            <rect x="14.67" y="7" width="5" height="25" fill="#fafaf7" opacity="0.85" />
            <rect x="22" y="0" width="5" height="13" fill="#c8a24a" />
            <rect x="22" y="15" width="5" height="17" fill="#c8a24a" />
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
          <div
            style={{
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Attention</span>
            <span>is a place.</span>
          </div>
          {/* Satori requires a single text child unless display is explicit,
              so the sentence is assembled in JS rather than in JSX. */}
          <div style={{ marginTop: 34, fontSize: 27, color: "#a8a69e", maxWidth: 900 }}>
            {`Out-of-home, broadcast and print. ${totalSites} owned sites across ${citiesCovered} Pakistani cities.`}
          </div>
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
          <span style={{ color: "#c8a24a" }}>Lahore, Pakistan</span>
          <span>·</span>
          <span>fangrovemedia.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(font
        ? { fonts: [{ name: "Archivo", data: font, weight: 700 as const, style: "normal" as const }] }
        : {}),
    },
  );
}
