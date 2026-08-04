"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { services } from "@/content/services";
import { areaBreakdown } from "@/content/sites";
import { company, whatsapp } from "@/content/company";
import { mailto } from "@/lib/format";

/** Areas we hold inventory in, plus an escape hatch for everything else. */
const AREAS = [...areaBreakdown().map((entry) => entry.area), "Elsewhere in Lahore", "Another city"];

const DURATIONS = ["1 month", "3 months", "6 months", "12 months", "Not sure yet"] as const;

/**
 * There is no form backend on this site — by choice. This composes a
 * structured enquiry and hands it to WhatsApp or the visitor's own mail
 * client, so it arrives from a real identity in a thread they own.
 *
 * The full body is shown on screen before they send it. Nothing is submitted
 * anywhere, and nothing is stored.
 */
export function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>([services[0]!.slug]);
  const [area, setArea] = useState<string>(AREAS[0]!);
  const [duration, setDuration] = useState<string>(DURATIONS[1]);
  const [organisation, setOrganisation] = useState("");
  const [notes, setNotes] = useState("");

  const toggleService = (slug: string) =>
    setSelected((current) =>
      current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug],
    );

  const serviceNames = useMemo(
    () =>
      services
        .filter((service) => selected.includes(service.slug))
        .map((service) => service.title),
    [selected],
  );

  const body = useMemo(
    () =>
      [
        "Hello Fangrove,",
        "",
        "We would like a quote.",
        "",
        `Services:   ${serviceNames.length > 0 ? serviceNames.join(", ") : "—"}`,
        `Area:       ${area}`,
        `Duration:   ${duration}`,
        `Company:    ${organisation || "—"}`,
        "",
        "Notes:",
        notes || "—",
        "",
        "Please send rates and current availability.",
        "",
        "Thank you.",
      ].join("\n"),
    [serviceNames, area, duration, organisation, notes],
  );

  const subject = `Quote request — ${serviceNames[0] ?? "Media"}${
    serviceNames.length > 1 ? ` +${serviceNames.length - 1}` : ""
  }, ${area}`;

  const href = mailto(company.contact.salesEmail, subject, body);

  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <fieldset>
          <legend className="text-label text-subtle">What do you need?</legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {services.map((service) => {
              const active = selected.includes(service.slug);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => toggleService(service.slug)}
                  aria-pressed={active}
                  className={`cursor-pointer rounded-[var(--radius-full)] border px-4 py-2.5 text-xs font-medium transition-colors duration-200 ${
                    active
                      ? "border-accent bg-accent-dim text-accent"
                      : "border-line-strong text-muted hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {service.title}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="text-label text-subtle">Area</span>
            <select
              value={area}
              onChange={(event) => setArea(event.target.value)}
              className="mt-3 w-full cursor-pointer rounded-[var(--radius-md)] border border-line-strong bg-bg px-4 py-3.5 text-sm text-ink transition-colors hover:border-ink/40"
            >
              {AREAS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-label text-subtle">Duration</span>
            <select
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="mt-3 w-full cursor-pointer rounded-[var(--radius-md)] border border-line-strong bg-bg px-4 py-3.5 text-sm text-ink transition-colors hover:border-ink/40"
            >
              {DURATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-6 block">
          <span className="text-label text-subtle">Company</span>
          <input
            type="text"
            value={organisation}
            onChange={(event) => setOrganisation(event.target.value)}
            placeholder="Your organisation"
            className="mt-3 w-full rounded-[var(--radius-md)] border border-line-strong bg-bg px-4 py-3.5 text-sm text-ink placeholder:text-subtle transition-colors hover:border-ink/40"
          />
        </label>

        <label className="mt-6 block">
          <span className="text-label text-subtle">Anything else</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Corridors you have in mind, campaign dates, artwork status…"
            className="mt-3 w-full resize-y rounded-[var(--radius-md)] border border-line-strong bg-bg px-4 py-3.5 text-sm text-ink placeholder:text-subtle transition-colors hover:border-ink/40"
          />
        </label>
      </div>

      {/* Live preview of exactly what will be sent. */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 border border-line">
          <div className="border-b border-line px-6 py-4">
            <p className="text-label text-subtle">Your message</p>
          </div>

          <div className="px-6 py-5">
            <p className="text-xs text-subtle">
              To:{" "}
              <span className="nums text-muted">{company.contact.phone}</span>
              <span className="mx-1.5">or</span>
              <span className="text-muted">{company.contact.salesEmail}</span>
            </p>
            <p className="mt-2 text-xs text-subtle">
              Subject: <span className="text-muted">{subject}</span>
            </p>
            <pre className="mt-5 max-h-72 overflow-auto whitespace-pre-wrap font-[family-name:var(--font-sans)] text-xs leading-relaxed text-muted">
              {body}
            </pre>
          </div>

          <div className="space-y-3 border-t border-line p-6">
            <a
              href={whatsapp(body)}
              target="_blank"
              rel="noreferrer noopener"
              className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] bg-ink px-6 py-4 text-sm font-medium text-bg transition-colors hover:bg-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Send on WhatsApp
            </a>
            <a
              href={href}
              className="flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-line-strong px-6 py-4 text-sm text-ink transition-colors hover:bg-ink/8"
            >
              <Mail className="size-4" aria-hidden="true" />
              Open in your email app
            </a>
            <p className="pt-1 text-xs text-subtle">
              Both options hand the message above to an app you already use. Nothing is
              submitted to or stored by this website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
