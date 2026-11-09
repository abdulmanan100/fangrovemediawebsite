import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * One table style for every table in a post: Markdown tables (through
 * mdx-components.tsx) and the data tables in EstateTables.tsx.
 *
 * The wrapper scrolls sideways on a phone instead of squeezing the columns.
 * A scrolling region has to be reachable by keyboard, hence the tabIndex.
 */
export function TableFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="my-9 overflow-x-auto rounded-[var(--radius-md)] border border-line"
    >
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function Th({ className = "", ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={`text-label whitespace-nowrap border-b border-line bg-surface px-4 py-3.5 text-left text-subtle ${className}`}
      {...props}
    />
  );
}

export function Td({ className = "", ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={`nums border-b border-line px-4 py-3.5 align-top text-muted [tr:last-child>&]:border-b-0 ${className}`}
      {...props}
    />
  );
}
