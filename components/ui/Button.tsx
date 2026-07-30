import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-md)] " +
  "px-7 py-4 text-sm font-medium tracking-[0.01em] cursor-pointer " +
  "transition-colors duration-200 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  // White on near-black. The default. Never a coloured fill.
  primary: "bg-ink text-bg hover:bg-white disabled:bg-white/10 disabled:text-ink/70",
  outline: "border border-line-strong text-ink hover:bg-ink/8 hover:border-ink/40",
  ghost: "text-muted hover:text-ink",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  /** Adds a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
};

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function Button({
  variant = "primary",
  children,
  arrow,
  className,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className ?? ""}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  children,
  arrow,
  className,
  href,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const classes = `${base} ${variants[variant]} ${className ?? ""}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}
