import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/content/studio";

/**
 * Six steps as an editorial list. No icons, no cards, no equal-weight grid —
 * a numbered sequence is already the clearest possible form for a sequence.
 */
export function Process() {
  return (
    <section className="section-y" aria-labelledby="process-heading">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="How it works"
          lines={["Brief to proof,", "in six steps."]}
          lede="Every step ends in something you can hold or check. If a stage produces nothing verifiable, it is not a stage — it is a delay."
        />
        <h2 id="process-heading" className="sr-only">
          Our process
        </h2>

        <ol className="mt-[var(--spacing-group)]">
          {process.map((step, i) => (
            <li key={step.index}>
              <Reveal delay={Math.min(i * 0.05, 0.25)}>
                <div className="grid grid-cols-1 gap-x-12 gap-y-4 border-t border-line py-9 md:grid-cols-12">
                  <span className="nums text-label text-accent md:col-span-1 md:pt-2">
                    {step.index}
                  </span>

                  <h3 className="text-headline md:col-span-3">{step.title}</h3>

                  <p className="text-body max-w-prose text-muted md:col-span-5">
                    {step.body}
                  </p>

                  <p className="text-label self-start text-subtle md:col-span-3 md:pt-2 md:text-right">
                    {step.deliverable}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
