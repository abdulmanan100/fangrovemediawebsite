import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FilmCard } from "@/components/work/FilmCard";
import { JsonLd } from "@/components/JsonLd";
import { videoSchema } from "@/lib/schema";
import { campaigns, totalFilms } from "@/content/work";

const featured = campaigns.slice(0, 2);

/**
 * Two campaign films, offset vertically. A symmetrical pair of equal cards
 * would give both the same weight; the offset creates a reading order.
 */
export function SelectedWork() {
  return (
    <section className="section-y" aria-labelledby="work-heading">
      {featured.map((film) => (
        <JsonLd key={film.slug} data={videoSchema(film)} />
      ))}
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="Selected work"
          lines={["Campaigns that", "had to hold up", "in traffic."]}
          lede="Outdoor is judged at speed, in bad light, by someone who is not looking for it. Everything below was built for that — and filmed on the faces that carried it."
          link={{ href: "/work", label: `All ${totalFilms} films` }}
        />
        <h2 id="work-heading" className="sr-only">
          Selected work
        </h2>

        <div className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {featured.map((film, i) => (
            <Reveal
              key={film.slug}
              delay={i * 0.08}
              className={i === 1 ? "lg:mt-28" : undefined}
            >
              <FilmCard film={film} sizes="(min-width: 1024px) 46vw, 92vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
