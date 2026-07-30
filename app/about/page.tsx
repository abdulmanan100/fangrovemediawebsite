import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Clients } from "@/components/sections/Clients";
import { Process } from "@/components/sections/Process";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { milestones, principles, team } from "@/content/studio";
import { company } from "@/content/company";
import { citiesCovered, totalSites } from "@/content/sites";
import { BLUR, images } from "@/lib/images";
import { pad2 } from "@/lib/format";

export const metadata = buildMetadata({
  title: "Studio — an OOH company that owns its steel",
  description:
    "Fangrove Media has run out-of-home, broadcast and print from Lahore since 2014. Owned structures, an in-house print floor, and published numbers.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Studio", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="The studio"
        lines={["We own", "the steel."]}
        lede="Most outdoor companies in Pakistan resell somebody else's inventory and inherit somebody else's maintenance schedule. We buy the land, put up the structure, print the face and mount it ourselves — which is why we can answer a question about a site without making a phone call first."
        meta={[
          { label: "Founded", value: String(company.founded) },
          { label: "Owned sites", value: String(totalSites) },
          { label: "Cities", value: String(citiesCovered) },
          { label: "Print floor", value: "In-house" },
        ]}
      />

      {/* Lahore */}
      <section className="shell pb-[var(--spacing-section)]">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <div className="media-reveal relative aspect-16/10 overflow-hidden rounded-[var(--radius-lg)] bg-surface">
              <Image
                src={images.lahoreSkyline}
                alt="Lahore skyline with Minar-e-Pakistan"
                fill
                sizes="(min-width: 1024px) 58vw, 92vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <RevealLines
              lines={["A city of", "thirteen million", "commutes."]}
              as="h2"
              className="text-section"
            />
            <Reveal delay={0.12}>
              <p className="text-body mt-8 text-muted">
                Lahore is the reason this business works. It is dense, it is congested, and
                almost everybody moves along the same handful of arteries twice a day.
                Frequency — the thing that actually makes outdoor advertising land — is
                almost free here if you own the right structures.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-body mt-6 text-subtle">
                We started with two roadside faces and a print floor on the Multan Road
                side of the city. Everything since has been bought out of what those
                earned.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <p className="text-label text-accent">How we operate</p>
          </Reveal>
          <RevealLines
            lines={["Four rules", "we do not bend."]}
            as="h2"
            className="text-section mt-7 max-w-[16ch]"
            delay={0.05}
          />

          <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((principle, i) => (
              <li key={principle.title}>
                <Reveal delay={Math.min(i * 0.06, 0.24)}>
                  <div className="border-t border-line pt-6">
                    <span className="nums text-label text-accent">{pad2(i + 1)}</span>
                    <h3 className="text-headline mt-4">{principle.title}</h3>
                    <p className="text-body mt-4 max-w-md text-muted">{principle.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Timeline */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <h2 className="text-section max-w-[12ch]">Since 2014.</h2>
          </Reveal>

          <ol className="mt-[var(--spacing-group)]">
            {milestones.map((milestone, i) => (
              <li key={milestone.year}>
                <Reveal delay={Math.min(i * 0.05, 0.25)}>
                  <div className="grid grid-cols-1 gap-x-12 gap-y-2 border-t border-line py-7 md:grid-cols-12">
                    <span className="nums font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.02em] text-accent md:col-span-2">
                      {milestone.year}
                    </span>
                    <p className="text-subhead text-muted md:col-span-9">{milestone.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Process />

      {/* Team */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <p className="text-label text-accent">The team</p>
          </Reveal>
          <RevealLines
            lines={["Four people", "you will", "actually speak to."]}
            as="h2"
            className="text-section mt-7 max-w-[18ch]"
            delay={0.05}
          />

          <ul className="mt-[var(--spacing-group)] grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <li key={member.role}>
                <Reveal delay={Math.min(i * 0.06, 0.24)}>
                  {/* Portraits go here once the real team photography exists —
                      see ASSETS.md. Until then the slot stays a flat plate
                      rather than a stock photograph of somebody who does not
                      work here. */}
                  <div
                    className="flex aspect-4/5 items-end rounded-[var(--radius-md)] border border-line bg-surface p-5"
                    aria-hidden="true"
                  >
                    <span className="text-label text-subtle">Portrait</span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-ink">{member.name}</h3>
                  <p className="text-label mt-2 text-accent">{member.role}</p>
                  <p className="text-body mt-3 text-muted">{member.bio}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Clients />
      <ContactCTA index="07" />
    </>
  );
}
