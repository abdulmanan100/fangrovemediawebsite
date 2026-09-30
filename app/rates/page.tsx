import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { whatsapp } from "@/content/company";
import { afterBooking, rateFactors, rateRequest } from "@/content/rates";
import { totalSites } from "@/content/sites";
import { pad2 } from "@/lib/format";

export const metadata = buildMetadata({
  title: "Billboard rates in Lahore — how pricing works",
  description:
    "How Fangrove prices billboards, hoardings and SMD screens in Lahore — audience, size, lighting and booking cycle — and how to get a same-day rate.",
  path: "/rates",
});

const rateMessage = whatsapp(
  "Hello Fangrove — please send a rate for:\n\n" +
    "Site reference or area: \n" +
    "Start (1st or 16th of): \n" +
    "Number of cycles: \n\n" +
    "Thank you.",
);

export default function RatesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Rates", path: "/rates" },
        ])}
      />

      <PageHero
        eyebrow="Rates"
        lines={["Billboard rates", "in Lahore."]}
        lede="Every rate is quoted per site and per booking cycle — two faces the same size on different roads are not the same buy. This is what sets the number, and what to send us to get it back the same day."
        meta={[
          { label: "Booking cycle", value: "Monthly" },
          { label: "Goes live", value: "1st or 16th" },
          { label: "Rate back", value: "Same day" },
          { label: "Sites to choose from", value: String(totalSites) },
        ]}
      />

      {/* What sets the rate */}
      <section className="shell pb-[var(--spacing-section)]">
        <RevealLines
          lines={["What sets", "the rate."]}
          as="h2"
          className="text-section max-w-[16ch]"
        />

        <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rateFactors.map((factor, i) => (
            <li key={factor.title}>
              <Reveal delay={Math.min(i * 0.06, 0.24)}>
                <div className="border-t border-line pt-6">
                  <span className="nums text-label text-accent">{pad2(i + 1)}</span>
                  <h3 className="text-headline mt-4">{factor.title}</h3>
                  <p className="text-body mt-4 max-w-md text-muted">{factor.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* What to send */}
      <section className="rule">
        <div className="shell section-y">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-label text-accent">Get a rate</p>
              </Reveal>
              <RevealLines
                lines={["Three things,", "one message."]}
                as="h2"
                className="text-section mt-7 max-w-[14ch]"
                delay={0.05}
              />
              <Reveal delay={0.1}>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    href={rateMessage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-ink px-7 py-4 text-sm font-medium text-bg transition-colors hover:bg-white"
                  >
                    Ask for a rate on WhatsApp
                  </a>
                  <Link
                    href="/network"
                    className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-ink"
                  >
                    Find a site reference
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Reveal>
            </div>

            <ol className="lg:col-span-6 lg:col-start-7">
              {rateRequest.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={Math.min(i * 0.06, 0.18)}>
                    <div className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6">
                      <span className="nums text-label pt-1 text-accent">{pad2(i + 1)}</span>
                      <div>
                        <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                        <p className="text-body mt-2 text-muted">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* After you book */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <p className="text-label text-accent">After you book</p>
          </Reveal>
          <RevealLines
            lines={["From booking", "to proof."]}
            as="h2"
            className="text-section mt-7 max-w-[16ch]"
            delay={0.05}
          />

          <ul className="mt-[var(--spacing-group)] grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {afterBooking.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={Math.min(i * 0.06, 0.24)}>
                  <div className="border-t border-line pt-6">
                    <span className="nums text-label text-accent">{pad2(i + 1)}</span>
                    <h3 className="mt-4 text-lg font-medium text-ink">{step.title}</h3>
                    <p className="text-body mt-3 text-muted">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCTA index="04" />
    </>
  );
}
