# Fangrove Media

Marketing site for **Fangrove Media** — an out-of-home, broadcast and print media company based in Lahore, Pakistan.

The media estate, site photography, coordinates, client roster and campaign list are all real — carried over from the company's own inventory deck and its earlier portfolio.

> ### ⚠ Read `ASSETS.md` before making this site public
> A few things are still assumed rather than confirmed — most importantly the **two email addresses**, which every enquiry link on the site depends on. `ASSETS.md` lists exactly what is real and what still needs replacing.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Motion | `motion` + `lenis` smooth scroll |
| Map | `react-leaflet` + CARTO dark basemap (**no API key needed**) |
| Icons | `lucide-react` |
| Fonts | Archivo + Instrument Serif (`next/font/google`), Geist Sans |
| Content | Typed TypeScript files in `content/` — no CMS, no database |
| Forms | None. Enquiries go to WhatsApp / `tel:` / `mailto:` by design |
| Hosting | Vercel |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Node 20.9+ required.

---

## Editing content

All copy and data live in `content/`. Nothing else needs to change when you edit them — page counts, sitemap entries, headline statistics and structured data are all derived.

| File | Holds |
|---|---|
| `content/company.ts` | Name, phone, email, address, hours, social, nav |
| `content/services.ts` | The six services, their copy, capabilities and spec tables |
| `content/sites.ts` | **The media estate.** 35 real sites — every billboard, screen and structure |
| `content/work.ts` | Campaign portfolio |
| `content/studio.ts` | Client roster, process, principles, team, timeline |
| `lib/images.ts` | Every non-site image URL, in one place |

Site photography lives in `public/media/sites/` and is referenced by each site's `photo` field.

### Adding a site to the network

Append an object to the `sites` array in `content/sites.ts`. That single edit updates the map, the area filters, the homepage counters, the sitemap, and generates a new statically-rendered page at `/network/<id>`.

Two fields are worth understanding:
- `pinApprox` — set it when a coordinate is placed on the road rather than geotagged. The site page then says so instead of implying precision it doesn't have.
- `photo` — a path under `public/media/sites/`, not a `lib/images.ts` key.

### Adding a service

Append to the `services` array in `content/services.ts`. A page appears at `/services/<slug>`, plus footer and index entries.

### Writing a journal post

The journal (`/blog`) exists to rank for the questions buyers search for, and to be quoted by AI answer engines (ChatGPT, Perplexity, Google AI Overviews). A post takes two pieces:

1. **The body:** `content/blog/<slug>.mdx`, in Markdown. Don't put an H1 in the body, because the page renders it from the title. Start with an intro paragraph, then use `##` sections.
2. **The metadata:** an entry in the `posts` array in `content/blog.ts`, holding the title, description, the 40–60 word `summary`, category, dates, author, related services/sites and the FAQ.

The page, social card, `BlogPosting` + `FAQPage` + breadcrumb JSON-LD, contents list, reading time, sitemap entry, RSS item (`/blog/feed.xml`), `llms.txt` line and the "Further reading" links on related service and site pages are all generated from those two files.

**Drafts.** New posts use `status: "draft"`. Drafts appear in `npm run dev` and on Vercel preview deploys, carry `noindex`, and are left out of production builds completely: no route, sitemap, feed or nav link. To publish a draft, set `status: "published"` and set `published` to the real go-live date. Set `updated` whenever you make a substantive edit later. `BLOG_DRAFTS=show` or `BLOG_DRAFTS=hide` overrides the default, e.g. `BLOG_DRAFTS=show npm run build` to review drafts in a production build. The "Journal" nav link only appears once there is a visible post.

**Live data in posts.** Never type a figure the site already holds. Use the components registered in `mdx-components.tsx` instead:

| Component | Renders |
|---|---|
| `<SiteTable area="Gulberg" />` · `ids={[...]}` · `format="Digital LED"` · `top={8}` | Sites with size, lighting and daily audience, each linked |
| `<AreaTable />` · `<FormatTable />` | The estate by area, or by format with size ranges |
| `<Stat name="totalSites" />` | One derived figure (`digitalScreens`, `areas`, `largestFace`, …) |
| `<Spec service="dooh" label="Loop" />` · `<SpecList service="flex-printing" />` | Values from a service's spec table |
| `<NoteList set="rateFactors" />` · `<ProcessSteps />` | Lists from `content/rates.ts` and `content/studio.ts` |
| `<Callout title="…">` | An aside. Leave blank lines inside it so its text renders as Markdown |

In `content/blog.ts` (summaries and FAQ answers), use template strings with values from `content/sites.ts`, as the existing posts do.

**Writing checklist (SEO + GEO):**
- Phrase the title as the search or the question.
- The `summary` answers the title outright in 40–60 words. It is shown first as "In short".
- Phrase `##` headings as questions where it reads naturally. Keep paragraphs short, and include at least one table or list of concrete specs.
- Name the entity in full with its place, "Fangrove Media, Lahore", at least once.
- Give 4–6 FAQ entries. They render on the page and as `FAQPage` data.
- Link to at least two service or network pages, and to related posts.
- **Write nothing the site's own data cannot back up.** No invented prices, statistics or client results. Cite a source for any outside fact.

**Authors.** Posts are credited to "Fangrove Media Editorial", which maps to the company's Organization schema. To credit a real person, add an entry to `authors` in `content/blog.ts` with `kind: "Person"`, `role` and LinkedIn in `sameAs`. A named expert is a strong trust signal for search.

---

## Architecture

```
app/
  layout.tsx              fonts, metadata, JSON-LD, header/footer, smooth scroll
  page.tsx                home — 8 sections
  services/               index + [slug]  (6 static pages)
  network/                explorer + [id] (26 static pages)  ← the differentiator
  work/                   index + [slug]  (6 static pages)
  blog/                   journal index + [slug] (MDX posts), feed.xml
  about/ · contact/
  sitemap.ts · robots.ts · llms.txt/ · opengraph-image.tsx · not-found.tsx
  globals.css             design tokens + type scale

components/
  layout/    Header · Footer · MobileMenu · Cursor · SmoothScroll · PageHero
  ui/        Reveal · Counter · Marquee · Magnetic · Button · SectionHeader
  sections/  the eight homepage sections, reused across inner pages
  network/   NetworkExplorer · NetworkMap · SiteCard · SiteDrawer
  contact/   QuoteBuilder
  blog/      PostCard · EstateTables · Facts · Toc · FurtherReading
  brand/     Logo

content/     all copy and data · blog.ts + blog/*.mdx (journal)
lib/         seo · schema · format · images · blog · navigation
mdx-components.tsx   how post Markdown renders
```

## Design system

Tokens are defined once in `app/globals.css` under `@theme`. **Use the tokens, never raw Tailwind palette classes** (`bg-gray-900`, `text-slate-400`, …).

```
bg #0a0a0a · surface #121212 · surface-2 #1a1a18
ink #fafaf7 (19:1) · muted #a8a69e (8.1:1) · subtle #82807a (5.0:1)
accent #c8a24a (8.2:1)   ← rationed: index numerals, active state, one CTA per page
radius 2–4px             ← near-square on purpose; this is a signage company
```

Type utilities: `text-hero` · `text-display` · `text-section` · `text-headline` · `text-subhead` · `text-body` · `text-label` · `text-editorial`. Layout utilities: `shell` · `section-y` · `rule` · `nums`.

Every colour pair above clears WCAG AA on the base background. Lighthouse on `/network`: **Accessibility 97+, Best Practices 100, SEO 100**.

Two accessibility constraints that are easy to regress:
- A `<dl>` may contain only `dt`/`dd`, or `div` wrappers holding them **directly** — so scroll-reveal wrappers go around the whole list, never around each cell.
- A `<ul>` may contain only `<li>`. Section headings that give card `h3`s something to descend from must sit outside the list.

### Motion

One reveal, everywhere: 24px rise, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 60ms stagger. Headings use a line-mask variant. `prefers-reduced-motion: reduce` disables Lenis, the custom cursor and every transform — this is enforced in `globals.css` and in each component, and must not be regressed.

Implementation notes worth keeping:
- **The first screen uses `Enter`, not `Reveal`.** `components/ui/Enter.tsx` is the same curve as plain CSS, so it starts on first paint. `Reveal` waits for hydration, and on a mid-range phone that held the largest paint (LCP) back by 2–3.5 s. Use `Enter`/`EnterLines` only for content visible on load, and `Reveal` below the fold.
- **`RevealLines` observes the heading, not the masked spans.** `IntersectionObserver` accounts for ancestor clipping, so a span translated fully outside its `overflow-hidden` parent never reports as visible.
- **Full-bleed background images use `z-0`, not `-z-10`.** `body` paints an opaque background; anything behind it disappears.

---

## Deployment

Vercel, zero configuration. Push to `main` and import the repo — the framework is detected automatically. No environment variables are required.

Before going live, set the real domain in `content/company.ts` → `siteConfig.url`. It drives canonicals, Open Graph URLs, `sitemap.xml` and every JSON-LD `@id`.

## SEO

- Per-page metadata via `lib/seo.ts`. Titles lead with the search phrase ("Billboard & outdoor advertising in Lahore"), not the section name. Services carry a separate `metaTitle` for this.
- JSON-LD: `AdvertisingAgency` + `LocalBusiness`, `WebSite`, `Service` per service, `BreadcrumbList`, a `Place` record per network site, and `Blog` / `BlogPosting` / `FAQPage` for the journal
- GEO: `/llms.txt` (generated from `content/`) maps the site for AI assistants. `robots.ts` deliberately allows AI crawlers. Journal posts lead with a direct-answer summary and are server-rendered at full opacity, with no scroll reveal on the body text.
- `sitemap.xml` (with image entries) and `robots.txt` generated from the content files
- Social cards from one design in `lib/og.tsx`: site-wide at `/opengraph-image`, plus one per site and per service. `buildMetadata` always sets the image, because a page's `openGraph` replaces the layout's instead of merging with it.
- Every site page must stay reachable by a plain link. The explorer on `/network` is client-rendered, so the server-rendered "Every site, by area" index below it and the "Nearest sites" list on each site page are the crawl paths. Don't remove both.
