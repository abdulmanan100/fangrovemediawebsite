# Replacement checklist

What on this site is real, and what still needs replacing. Work top to bottom.

Most of the original placeholder content has now been replaced with the company's own material, carried over from the previous Omelet Advertising site during the rebrand.

---

## ✅ Now real — no action needed

| What | Source |
|---|---|
| **Media estate** — 35 sites: names, areas, face sizes, illumination, approach directions and daily audience figures | The company's own OOH inventory deck |
| **Site coordinates** | The company's own "OMELET MEDIA LAHORE" Google My Maps export |
| **Site photography** | The company's own site photography, cropped from the deck |
| **Client roster** — Carrefour, Packages Mall, Metro Cash & Carry, IGI Life, ACCA, Al Fatah, Car First, Condis by Spain, Zero Carbon Solar, Asghar Ali Perfumes | Previous portfolio |
| **Campaigns** — the 11 above | Previous portfolio |
| **Founded 2008 · 250+ brands · 30+ staff** | Previous about and portfolio pages |
| **Phone / WhatsApp** — +92 322 807 2185 | Client |
| **Address** — 10D Commercial, Pak Arab Society, Lahore | Client |
| **Icons** — favicon and apple-touch icon, generated from the logo mark | Built |

---

## 1. Blocking — fix before the site is public

### Email addresses
**File:** `content/company.ts`

`hello@fangrovemedia.com` and `sales@fangrovemedia.com` are assumed, not confirmed.

This is **no longer able to lose you an enquiry** — WhatsApp on the confirmed mobile is now the primary route everywhere (site drawer, site pages, contact page, quote builder, and the CTA on every page), with email as the secondary option. But the addresses are still printed on the contact page and in the footer, so they need to either exist or be removed.

### Domain
**File:** `content/company.ts` → `siteConfig.url`

Currently `https://fangrovemedia.com`. Drives canonical URLs, Open Graph tags, `sitemap.xml` and every JSON-LD `@id`.

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

`content/work.ts` shows a photograph **only** where one verifiably shows that client's creative on one of our faces — currently Carrefour and Zero Carbon Solar. The other nine render as typographic cards on purpose: pairing a client name with an unrelated board implies creative that isn't theirs.

Drop real campaign photos into `public/media/work/` and add an `image` to those entries to convert them.

### Case studies

`content/work.ts` is deliberately a light model — client, campaign, discipline, year. The source material had no briefs, strategies or measured outcomes, and inventing those for real named clients would be fabrication.

When real write-ups exist, add a `story` field and reinstate a `/work/[slug]` detail route.

---

## 5. Optional

- **Analytics** — nothing installed. Vercel Analytics is one line in `app/layout.tsx`.
- **Other cities** — the owned estate is Lahore only. `content/company.ts` → `stats.marketsCovered` records that campaigns are bought across Lahore, Islamabad and Karachi. If you own inventory in the other two, add it to `content/sites.ts` and widen the `CITIES` union.
- **Rate card** — the site publishes dimensions and audience but no prices, which is the right default. If you want indicative rates, add a `grossRate` field to `MediaSite`.
- **Urdu** — the site is `lang="en-PK"`, English only. Adding Urdu means a locale layer and an RTL pass over the tokens.
