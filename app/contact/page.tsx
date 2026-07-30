import { ArrowUpRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteBuilder } from "@/components/contact/QuoteBuilder";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/content/company";

export const metadata = buildMetadata({
  title: "Contact — rates in an hour",
  description:
    "Call or email Fangrove Media in Lahore for outdoor, DOOH, broadcast, press and printing rates. Office at Main Boulevard, Gulberg III.",
  path: "/contact",
});

const channels = [
  {
    icon: Phone,
    label: "Phone",
    value: company.contact.phone,
    href: company.contact.phoneHref,
    note: "Fastest route to a rate. Mon–Sat, 09:00–18:00 PKT.",
  },
  {
    icon: Mail,
    label: "Sales",
    value: company.contact.salesEmail,
    href: `mailto:${company.contact.salesEmail}`,
    note: "Rates, availability and artwork specifications.",
  },
  {
    icon: Mail,
    label: "General",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
    note: "Everything else, including supplier and press enquiries.",
  },
];

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${company.address.coords[0]},${company.address.coords[1]}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Get in touch"
        lines={["Tell us the", "corridor."]}
        lede="Outdoor gets bought over the phone, so there is no contact form on this site. Call and you will get a rate the same day. If you would rather write, the builder below drafts a structured enquiry for you."
      />

      {/* Direct channels */}
      <section className="shell pb-[var(--spacing-section)]">
        <ul className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {channels.map((channel, i) => (
            <li key={channel.label} className="bg-bg">
              <Reveal delay={i * 0.06}>
                <a href={channel.href} className="group flex h-full flex-col p-7 md:p-8">
                  <span className="flex items-center gap-2.5 text-label text-subtle">
                    <channel.icon className="size-3.5" aria-hidden="true" />
                    {channel.label}
                  </span>
                  <span className="nums mt-6 break-words text-lg font-medium text-ink transition-colors group-hover:text-accent md:text-xl">
                    {channel.value}
                  </span>
                  <span className="text-body mt-4 text-subtle">{channel.note}</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Studio */}
        <div className="mt-[var(--spacing-group)] grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="text-label border-t border-line pt-5 text-subtle">
              <MapPin className="mr-2 inline size-3.5" aria-hidden="true" />
              Studio
            </h2>
            <address className="text-subhead mt-6 not-italic text-ink">
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.city}
              <br />
              {company.address.country}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline group mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              Open in Google Maps
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3">
            <h2 className="text-label border-t border-line pt-5 text-subtle">
              <Clock className="mr-2 inline size-3.5" aria-hidden="true" />
              Hours
            </h2>
            <p className="text-subhead mt-6 text-ink">{company.hours.label}</p>
            <p className="text-body mt-4 text-subtle">
              Mounting crews run overnight. Urgent creative swaps on digital inventory are
              handled outside office hours.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="lg:col-span-3 lg:col-start-10">
            <h2 className="text-label border-t border-line pt-5 text-subtle">Elsewhere</h2>
            <ul className="mt-6 space-y-3">
              {Object.entries(company.social).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-sm capitalize text-muted transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Quote builder */}
      <section className="rule">
        <div className="shell section-y">
          <Reveal>
            <p className="text-label text-accent">Draft an enquiry</p>
            <h2 className="text-section mt-7 max-w-[16ch]">
              Build the message, send it yourself.
            </h2>
            <p className="text-subhead mt-7 max-w-2xl text-muted">
              Pick what you need and this composes a structured email in your own mail
              client. It means your enquiry arrives from your real address, in a thread you
              control — and nothing you type here is submitted to or stored by this site.
            </p>
          </Reveal>

          <div className="mt-[var(--spacing-group)]">
            <QuoteBuilder />
          </div>
        </div>
      </section>
    </>
  );
}
