import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { company, navigation, siteConfig } from "@/content/company";
import { services } from "@/content/services";
import { citiesCovered, totalSites } from "@/content/sites";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="rule mt-px bg-bg">
      <div className="shell pt-[var(--spacing-group)] pb-10">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-4">
            <LogoMark className="h-9 w-auto text-ink" />
            <p className="text-subhead mt-7 max-w-xs text-muted">
              Out-of-home, broadcast and print. {totalSites} owned sites across{" "}
              {citiesCovered} cities.
            </p>
            <address className="mt-8 not-italic text-sm leading-relaxed text-subtle">
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.city}, {company.address.country}
            </address>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="text-label text-subtle">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="link-underline text-sm text-muted transition-colors hover:text-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className="text-label text-subtle">
              Company
            </h2>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Direct */}
          <div className="lg:col-span-3">
            <h2 className="text-label text-subtle">Direct</h2>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href={company.contact.phoneHref}
                  className="link-underline nums text-sm text-muted transition-colors hover:text-ink"
                >
                  {company.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="link-underline text-sm text-muted transition-colors hover:text-ink"
                >
                  {company.contact.email}
                </a>
              </li>
              <li className="pt-1 text-sm text-subtle">{company.hours.label}</li>
            </ul>

            <ul className="mt-8 flex gap-5">
              {Object.entries(company.social).map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-label text-subtle transition-colors hover:text-ink"
                  >
                    {label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Oversized wordmark. Decorative — the accessible name is in the header. */}
      <div className="shell overflow-hidden pb-6" aria-hidden="true">
        <span
          className="block w-full select-none font-[family-name:var(--font-display)] font-bold uppercase leading-[0.78] text-[color:var(--color-surface-2)]"
          style={{ fontSize: "clamp(4rem, 19.5vw, 19rem)", letterSpacing: "-0.045em" }}
        >
          Fangrove
        </span>
      </div>

      <div className="rule">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>
            {company.address.line2}, {company.address.city} · {company.hours.label}
          </p>
          <a href={siteConfig.url} className="link-underline hover:text-muted">
            {siteConfig.url.replace("https://", "")}
          </a>
        </div>
      </div>
    </footer>
  );
}
