import type { OutlineItem } from "@/lib/blog";

/**
 * "On this page": the post's H2s as jump links. Collapsed behind a summary on
 * small screens, where it would otherwise push the article down; open and
 * sticky beside the text on large ones. Plain HTML, no script.
 */
export function Toc({ items }: { items: readonly OutlineItem[] }) {
  if (items.length < 3) return null;

  const list = (
    <ol className="mt-4 space-y-3 border-l border-line">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-muted transition-colors hover:border-accent hover:text-ink"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28">
      <details className="group rounded-[var(--radius-md)] border border-line p-5 lg:hidden">
        <summary className="text-label cursor-pointer list-none text-subtle marker:hidden">
          On this page <span className="nums">({items.length})</span>
        </summary>
        {list}
      </details>
      <div className="hidden lg:block">
        <p className="text-label text-subtle">On this page</p>
        {list}
      </div>
    </nav>
  );
}
