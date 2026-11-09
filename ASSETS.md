# Replacement checklist

What on this site is real, and what still needs replacing. Work top to bottom.

Most of the original placeholder content has now been replaced with the company's own material, carried over from its earlier website.

---

## ✅ Now real — no action needed

| What | Source |
|---|---|
| **Media estate** — 35 sites: names, areas, face sizes, illumination, approach directions and daily audience figures | The company's own OOH inventory deck |
| **Site coordinates** | The company's own Google My Maps export of its Lahore sites |
| **Site photography** | The company's own site photography, cropped from the deck |
| **Client roster** — Carrefour, Packages Mall, Metro Cash & Carry, IGI Life, ACCA, Al Fatah, Car First, Condis by Spain, Zero Carbon Solar, Asghar Ali Perfumes | Previous portfolio |
| **Campaigns** — the 11 above | Previous portfolio |
| **Campaign photography** — all 11, each showing that client's creative on the face that ran it | Frames from the campaign reels, plus our own site photography |
| **Founded 2008 · 250+ brands · 30+ staff** | Previous about and portfolio pages |
| **Phone / WhatsApp** — +92 322 807 2185 | Client |
| **Address** — 10D Commercial, Pak Arab Society, Lahore | Client |
| **Domain** — `https://www.fangrovemedia.org` (the bare domain redirects to www), set in `content/company.ts` → `siteConfig.url` | Client |
| **Icons** — favicon and apple-touch icon, generated from the logo mark | Built |

---

## 1. Blocking — fix before the site is public

### Email addresses
**File:** `content/company.ts`

`hello@fangrovemedia.org` and `sales@fangrovemedia.org` are assumed, not confirmed. They were moved from `.com` to `.org` to match the site's domain.

This is **no longer able to lose you an enquiry** — WhatsApp on the confirmed mobile is now the primary route everywhere (site drawer, site pages, contact page, quote builder, and the CTA on every page), with email as the secondary option. But the addresses are still printed on the contact page and in the footer, so they need to either exist or be removed.

---

## 2. Needs checking

### Team — currently omitted
**File:** `content/studio.ts` → `team`

The array is **empty on purpose**, and the About page skips the whole team section while it is. That is better than shipping four cards reading "Placeholder Name".

Add real people — `name`, `role`, `bio`, and optionally `photo` (a path under `public/`) — and the section reappears with no other changes.

### Timeline — replaced with confirmed figures
**File:** `content/studio.ts` → `facts`

An invented year-by-year timeline was removed and replaced with three verifiable numbers: founded 2008, 250+ brands, 30+ staff.

If the real milestones become available — first structure, first LED screen, first national client — a timeline tells a better story than a stat grid. But not at the cost of making the years up.

### Process and principles
**File:** `content/studio.ts`

Six process steps and four principles, written as commitments the business is making in public. Keep only the ones you will actually honour — particularly *"if it did not run, you do not pay for it"* and the monthly verification pack.

### Legal entity and social profiles
**File:** `content/company.ts`

`Fangrove Media (Pvt.) Ltd.` and the three social URLs are assumed. Correct or delete.

### Service specifications
**File:** `content/services.ts`

Sheet sizes, roll widths, gsm ranges, pixel pitches and turnaround times are industry-typical rather than measured from your equipment. Worth a read-through by whoever runs the print floor.

Two structural notes:
- **Outdoor Media was added** as a service because the estate is mostly static billboards; without it the Network page would show inventory the services never mention.
- **MOPIS was left out** at your instruction — though the inventory deck calls these **moppies**, and the Bahria Town run of 20 double-sided 5 × 10 ft units is now in the estate as the `Moppie` format. Adding a MOPIS service page is a single entry in `content/services.ts`.

---

## 3. Map coordinates

Site pins come from your own Google My Maps export. **Six** bridge and underpass panels were not in that export — the four Canal Road / Mall Road bridge and underpass faces, and the two Mall Road bridges. Those are placed on the correct road from their approach description and carry `pinApprox: true`, which makes the site page say so rather than imply false precision.

To fix: add them to the My Maps, re-export, and update `coords` in `content/sites.ts`, then drop the `pinApprox` flag.

### The office pin

`content/company.ts` deliberately holds **no** coordinates for the office. Pak Arab Society is absent from OpenStreetMap, Photon and Overpass, and nearby road anchors disagree by kilometres.

A wrong `geo` block is actively harmful — in `LocalBusiness` structured data it **overrides** the postal address in Google's local index. So `lib/schema.ts` publishes the address with no `geo`, and every map link resolves through `mapsUrl`, built from the written address.

Optional: right-click the office in Google Maps, copy the `lat, lng`, add `coords` to `address`, and re-add the `geo` property in `lib/schema.ts`.

---

## 4. Photography

**File:** `lib/images.ts` — all non-site imagery resolves through this one file.

Site photography (`public/media/sites/`) is yours. The remaining 15 images are Unsplash stock used for service pages and section backdrops, chosen against three rules worth keeping:

1. **No legible third-party brand names.** An OOH company should not give Samsung free impressions on its own website. Several otherwise-good candidates were rejected for this.
2. **No non-Pakistani landmarks** in primary positions.
3. **Dark and low-saturation** — the design system supplies colour, photography supplies texture.

| Key | Used on | What to shoot |
|---|---|---|
| `heroCorridor` | Home hero | Night, elevated carriageway with light trails, one of your faces visible |
| `billboardBlank` · `billboardStructure` | Outdoor Media | A clean face before mounting; low angle on the steel and lighting rig |
| `digitalPanel` | DOOH | One of your LED screens after dark, running |
| `streetNight` | Network preview | Dark street, face in silhouette |
| `pressNewsprint` · `pressRollers` · `pressOffset` · `pressFloor` · `paperStock` | Print services | Your own print floor |
| `broadcastStudio` | Electronic Media | A studio or edit suite |
| `lahoreSkyline` · `lahoreFort` · `lahoreStreet` · `lahoreBadshahi` | About | The city |

Add `public/favicon.ico`, `icon.png` (512×512) and `apple-icon.png` (180×180) — the logo mark on `#0a0a0a` works.

### Campaign photography

All 11 campaigns are real, each with a photograph of that client's creative on the face that carried it. `content/work.ts` holds the entry; `public/media/work/` holds a 21:9 WebP poster.

**Why 21:9 and not 16:9.** Nine of these frames come from the campaign reels, and six of those carry an old logo in the top-right corner. Cropping the top strip removes it at full width, so no part of the board is lost. Every poster uses the same crop so the grid stays consistent. Two posters (Carrefour, Zero Carbon Solar) are our own site photography of the same creative.

**The reels are not shown.** The mark is burnt into the footage — six carry the corner bug throughout, and the IGI Life film opens on a full-screen logo. Only Zero Carbon Solar and Asghar Ali Perfumes are clean. There is no way to show the others without showing that old logo, so the site has no video player at all.

**If you re-cut the films without the logo**, they can go back in — the source URLs are kept below for that. Nothing else in the codebase depends on them.

| Campaign | Reel |
|---|---|
| Packages Shopping Festival | `youtu.be/7UDmdtTGXJs` |
| Carrefour | `youtu.be/vDmk15Meh0o` |
| IGI Life | `youtu.be/BvHdqUTIaUs` |
| Metro Cash & Carry trolley | `youtu.be/borOLmcHJ9Q` |
| Condis by Spain | `youtu.be/WBMc4ZKZx7E` |
| Packages Mall | `youtu.be/VEh5s57c6Yk` |
| Zero Carbon Solar *(clean)* | `youtu.be/MecCW7sopBo` |
| ACCA | `youtu.be/F5RveF-J80U` |
| Car First | `youtu.be/MYEvUZMM8CE` |
| Asghar Ali Perfumes *(clean)* | `youtu.be/a7Vz0q-_yE0` |
| Al Fatah Superstore | `youtu.be/5bYEcOJGQBM` |

To add a campaign, append to `content/work.ts` with a poster path. The `/work` grid and the service cross-links follow from that one entry.

### Case studies

`content/work.ts` is deliberately a light model — client, campaign, discipline, year. The source material had no briefs, strategies or measured outcomes, and inventing those for real named clients would be fabrication.

When real write-ups exist, add a `story` field and reinstate a `/work/[slug]` detail route.

---

## 5. Optional

- **Analytics** — nothing installed. Vercel Analytics is one line in `app/layout.tsx`.
- **Other cities** — the owned estate is Lahore only. `content/company.ts` → `stats.marketsCovered` records that campaigns are bought across Lahore, Islamabad and Karachi. If you own inventory in the other two, add it to `content/sites.ts` and widen the `CITIES` union.
- **Rate card** — the site publishes dimensions and audience but no prices, which is the right default. If you want indicative rates, add a `grossRate` field to `MediaSite`.
- **Urdu** — the site is `lang="en-PK"`, English only. Adding Urdu means a locale layer and an RTL pass over the tokens.
