import { Marquee } from "@/components/ui/Marquee";
import { LogoMark } from "@/components/brand/Logo";
import { clients } from "@/content/studio";

/**
 * Client roster as a continuous strip. Set in the display face rather than as
 * logo images — a row of mismatched vector logos is the single most common way
 * a good site starts looking like a template.
 */
export function Clients() {
  return (
    <section className="rule border-b border-line py-7" aria-labelledby="clients-heading">
      <h2 id="clients-heading" className="sr-only">
        Selected clients
      </h2>

      <Marquee duration={56}>
        {clients.map((client) => (
          <span key={client} className="flex shrink-0 items-center">
            <span
              className="px-8 font-[family-name:var(--font-display)] text-lg font-medium uppercase tracking-[-0.01em] text-subtle transition-colors duration-300 hover:text-ink md:text-xl"
            >
              {client}
            </span>
            <LogoMark
              accent={false}
              className="h-3 w-auto shrink-0 text-line-strong"
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
