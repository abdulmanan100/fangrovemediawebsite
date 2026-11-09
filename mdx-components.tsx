import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";
import { TableFrame, Td, Th } from "@/components/blog/Table";
import { AreaTable, FormatTable, SiteTable } from "@/components/blog/EstateTables";
import { Callout, NoteList, ProcessSteps, Spec, SpecList, Stat } from "@/components/blog/Facts";

/**
 * How Markdown in content/blog/*.mdx renders. Required by @next/mdx in the
 * App Router, and the only place post typography is defined, so every post
 * shares one measure, one rhythm and the site's own tokens.
 *
 * Headings get `scroll-mt` so a jump link does not land them under the fixed
 * header. Only H2 and H3 are styled: the page owns the H1.
 */

function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const className =
    "text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent";

  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={className} {...props} />;
  }
  return <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...props} />;
}

const components: MDXComponents = {
  h2: (props) => <h2 className="text-headline mt-16 scroll-mt-28 text-ink first:mt-0" {...props} />,
  h3: (props) => <h3 className="mt-10 scroll-mt-28 text-lg font-medium text-ink" {...props} />,
  p: (props) => <p className="text-body mt-5 text-muted first:mt-0 md:text-[1.0625rem]" {...props} />,
  ul: (props) => (
    <ul className="text-body mt-5 list-disc space-y-2.5 pl-5 text-muted marker:text-subtle md:text-[1.0625rem]" {...props} />
  ),
  ol: (props) => (
    <ol className="text-body mt-5 list-decimal space-y-2.5 pl-5 text-muted marker:text-subtle md:text-[1.0625rem]" {...props} />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-medium text-ink" {...props} />,
  em: (props) => <em className="text-editorial text-[1.08em] text-ink" {...props} />,
  a: A,
  blockquote: (props) => (
    <blockquote className="my-9 border-l-2 border-line-strong pl-6 text-subhead text-ink [&>p]:text-ink" {...props} />
  ),
  hr: () => <hr className="my-14 border-line" />,
  code: (props) => (
    <code className="rounded-[var(--radius-sm)] bg-surface-2 px-1.5 py-0.5 text-[0.9em] text-ink" {...props} />
  ),
  table: ({ children }) => <TableFrame label="Table">{children}</TableFrame>,
  th: (props) => <Th {...props} />,
  td: (props) => <Td {...props} />,

  // Components posts can use without importing them.
  SiteTable,
  AreaTable,
  FormatTable,
  Stat,
  Spec,
  SpecList,
  NoteList,
  ProcessSteps,
  Callout,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
