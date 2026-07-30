# Replacement checklist

Everything on this site that is **not real** is listed here. Work top to bottom.

The first two sections are the ones that actually matter legally and commercially — invented case studies and a phone number that does not ring are worse than no website at all.

---

## 1. Blocking — must be fixed before the site is public

### Case studies are fictional
**File:** `content/work.ts`

All six clients (Karvaan Mobility, Riwaj, Almas Steel, Chinar Foods, Nishan Telecom, Waseeb Agri) are **invented**, and so is every result figure. They exist so the layout could be reviewed with realistic content.

Publishing them as-is would present fabricated client relationships and fabricated outcomes as real. Replace them with genuine work, or delete the entries and remove `/work` from `content/company.ts` → `navigation` until you have some.

### Client roster is fictional
**File:** `content/studio.ts` → `clients`

Fourteen invented company names, shown in the marquee on the home and about pages. Replace with real clients — **and only ones who have agreed to be named.**

### Contact details — partly real
**File:** `content/company.ts`

Confirmed by the client and live on the site:

| Field | Value |
|---|---|
| `contact.phone` | **+92 322 807 2185** |
| `address` | **10D Commercial, Pak Arab Society, Lahore, Pakistan** |

Still outstanding:

| Field | Current | Needs |
|---|---|---|
| `address.coords` | `[31.5127, 74.3506]` | **Wrong — still the old Gulberg pin.** Does not match the Pak Arab Society address. Drives the `geo` block in LocalBusiness structured data and the coordinate readout in the footer and hero. |
| `contact.email` | `hello@fangrovemedia.com` | A mailbox that exists |
| `contact.salesEmail` | `sales@fangrovemedia.com` | A mailbox that exists |
| `legalName` | `Fangrove Media (Pvt.) Ltd.` | Registered legal entity |
| `founded` | `2014` | Real founding year |
| `social.*` | Guessed profile URLs | Real profiles, or delete the entries |

The postal code was removed rather than guessed — add `postalCode` back to `address` if you want it in the structured data, and it will need re-adding to the footer, contact page and `lib/schema.ts`.

To fix the coordinates: open the office location in Google Maps, right-click the pin, copy the `lat, lng` pair, and paste it into `address.coords`.

### Domain
**File:** `content/company.ts` → `siteConfig.url`

Currently `https://fangrovemedia.com`. Drives canonical URLs, Open Graph tags, `sitemap.xml` and every JSON-LD `@id`. Set it to the real domain before launch.

---

## 2. Inventory — the network is illustrative

**File:** `content/sites.ts`

26 sites. The **road names, junctions and coordinates are real places in Pakistan** so the map reads correctly — Kalma Chowk, Thokar Niaz Baig, Canal Bank, Shahrah-e-Faisal and so on. Everything else is invented:

- structures and whether Fangrove owns them
- dimensions, illumination, direction of approach
- daily impression counts
- availability

Replace the array with real inventory. The type is enforced, so a mistake fails the build rather than shipping quietly. Everything downstream updates on its own: the map, the filters, the homepage counters (26 sites / 5 cities / 5.32M impressions), the sitemap, and 26 statically-generated pages.

Also review, in the same file:
- `CITIES`, `FORMATS`, `ILLUMINATIONS` — the filter vocabularies
- `content/company.ts` → `stats.printCapacitySqFtDay`

---

## 3. Team

**File:** `content/studio.ts` → `team`

Four entries, all `Placeholder Name`, with instructions in each `bio` field. The About page renders a flat plate where a portrait goes rather than a stock photo of somebody who does not work at Fangrove — replace both the people and, if you add portraits, the placeholder block in `app/about/page.tsx`.

`milestones` in the same file is a plausible invented history. Replace with the real one.

---

## 4. Photography

**File:** `lib/images.ts` — every image on the site resolves through this one file.

All fifteen are Unsplash stock, chosen against three rules worth keeping when you replace them:

1. **No legible third-party brand names.** An OOH company should not be giving Samsung free impressions on its own website. Several otherwise-good candidates were rejected for this.
2. **No non-Pakistani landmarks** in primary positions.
3. **Dark and low-saturation.** The design system supplies the colour; photography supplies texture.

To swap: drop files into `public/`, change the value in `lib/images.ts` to e.g. `/media/hero-corridor.jpg`, and remove the `images.unsplash.com` entry from `next.config.ts` → `remotePatterns` once nothing references it.

### Shot list

| Key | Used on | What to shoot |
|---|---|---|
| `heroCorridor` | Home hero | Night, elevated carriageway with light trails, one of your faces visible. Landscape, room on the left for type. |
| `billboardBlank` | Outdoor Media, network | A clean unblemished face against dusk sky — ideally one of your own before mounting |
| `billboardStructure` | Network, galleries | Low angle on the steel and lighting rig. Engineering, not advertising. |
| `digitalPanel` | DOOH service | One of your LED screens after dark, running |
| `streetNight` | Network preview | Dark street with a face in silhouette. Texture. |
| `pressNewsprint` | Print Media | Newsprint coming off the press, motion blur |
| `pressRollers` | Home print section | Inked rollers, close |
| `pressOffset` | Flex Printing | The large-format printer mid-run |
| `pressFloor` | Galleries | The production floor, wide, people working |
| `paperStock` | Commercial Printing | Stock swatches — the one saturated image on the site |
| `broadcastStudio` | Electronic Media | A studio or edit suite |
| `lahoreSkyline` | About | Lahore, unmistakably |
| `lahoreFort` · `lahoreStreet` · `lahoreBadshahi` | About, galleries | The city and a real working street |

Add a `public/favicon.ico`, `icon.png` (512×512) and `apple-icon.png` (180×180) — the logo mark on `#0a0a0a` works.

---

## 5. Copy to review

The service copy in `content/services.ts` was written to be industry-accurate and is safe to keep, but check these against how Fangrove actually operates:

- **Specification tables** — sheet sizes, roll widths, gsm ranges, pixel pitches, turnaround times and artwork deadlines are all industry-typical rather than measured from your equipment.
- **"Six disciplines"** — the site presents Outdoor Media, DOOH, Electronic Media, Print Media, Commercial Printing and Flex Printing. **Outdoor Media was added** because you own static billboards and unipoles; without it the Network page would show inventory the services never mention. **MOPIS was left out** at your instruction. Both are one-entry edits in `content/services.ts`, and the count in the headings is derived, not hard-coded.
- **Process and principles** in `content/studio.ts` — six steps and four rules, written as commitments. Only keep the ones you will actually honour, particularly "if it did not run, you do not pay for it".

---

## 6. Optional

- **Analytics** — nothing is installed. Vercel Analytics is one line in `app/layout.tsx`.
- **Urdu** — the site is `lang="en-PK"`, English only. Adding Urdu means a locale layer and an RTL pass over the design tokens.
- **A real form** — the contact page composes a `mailto:` on purpose and stores nothing. If you later want submissions in a database, `QuoteBuilder` already collects the right fields.
