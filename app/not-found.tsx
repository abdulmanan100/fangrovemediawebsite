import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/company";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-40">
      <p className="text-label text-accent">404</p>
      <h1 className="text-display mt-7 max-w-[14ch]">This face is blank.</h1>
      <p className="text-subhead mt-7 max-w-lg text-muted">
        The page you asked for is not here. Nothing is booked on it either — try one of
        these instead.
      </p>

      <ul className="mt-12 max-w-md">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-6 border-t border-line py-5"
            >
              <span className="text-headline transition-colors duration-300 group-hover:text-accent">
                {item.label}
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 text-subtle transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
