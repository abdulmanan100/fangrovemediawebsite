import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/work/WorkCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { caseStudies } from "@/content/work";

export const metadata = buildMetadata({
  title: "Work — campaigns built for traffic",
  description:
    "Selected out-of-home, DOOH, broadcast and print campaigns from Fangrove Media across Lahore, Punjab, Sindh and the capital.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />

      <PageHero
        eyebrow="Selected work"
        lines={["Built to hold up", "in traffic."]}
        lede="Outdoor is judged at forty kilometres an hour, in bad light, by somebody who is not looking for it. Every campaign below was planned for that constraint rather than for a presentation deck."
      />

      <section className="shell pb-[var(--spacing-section)]">
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal
              key={study.slug}
              delay={(i % 2) * 0.08}
              className={i % 2 === 1 ? "lg:mt-24" : undefined}
            >
              <WorkCard
                study={study}
                ratio={i % 3 === 1 ? "portrait" : "landscape"}
                sizes="(min-width: 1024px) 46vw, 92vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA index="02" />
    </>
  );
}
