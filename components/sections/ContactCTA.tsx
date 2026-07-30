import Link from "next/link";
import { ArrowUpRight, Phone, Mail } from "lucide-react";
import { Reveal, RevealLines } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { company } from "@/content/company";

/**
 * The closing block on every page. There is no contact form anywhere on this
 * site by design — outdoor gets bought over the phone, so the phone number is
 * the largest interactive element on the page.
 */
export function ContactCTA({ index = "06" }: { index?: string }) {
  return (
    <section className="rule bg-bg" aria-labelledby="contact-cta-heading">
      <div className="shell section-y">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="text-label nums text-accent">{index}</span>
            <span className="text-label text-subtle">Get in touch</span>
          </div>
        </Reveal>

        <RevealLines
          lines={["Tell us the", "corridor. We'll", "quote it today."]}
          as="h2"
          className="text-display mt-10 max-w-[18ch]"
          delay={0.05}
        />
        <span id="contact-cta-heading" className="sr-only">
          Contact Fangrove Media
        </span>

        <div className="mt-[var(--spacing-group)] grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul className="space-y-8">
              <li>
                <Reveal>
                  <a
                    href={company.contact.phoneHref}
                    className="group flex items-center gap-4 text-ink"
                  >
                    <Phone className="size-5 shrink-0 text-subtle transition-colors group-hover:text-accent" aria-hidden="true" />
                    <span className="nums text-[clamp(1.5rem,3.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em] transition-colors group-hover:text-accent">
                      {company.contact.phone}
                    </span>
                  </a>
                </Reveal>
              </li>
              <li>
                <Reveal delay={0.06}>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="group flex items-center gap-4 text-ink"
                  >
                    <Mail className="size-5 shrink-0 text-subtle transition-colors group-hover:text-accent" aria-hidden="true" />
                    <span className="text-[clamp(1.25rem,3vw,2.125rem)] font-medium leading-none tracking-[-0.025em] transition-colors group-hover:text-accent">
                      {company.contact.email}
                    </span>
                  </a>
                </Reveal>
              </li>
            </ul>

            <Reveal delay={0.14}>
              <div className="mt-12">
                <Magnetic className="inline-block">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 rounded-[var(--radius-md)] bg-ink px-8 py-4.5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-white"
                  >
                    Build a quote request
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <h3 className="text-label text-subtle">Studio</h3>
              <address className="mt-5 not-italic text-body text-muted">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city}
                <br />
                {company.address.country}
              </address>
              <p className="text-body mt-6 text-subtle">{company.hours.label}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
