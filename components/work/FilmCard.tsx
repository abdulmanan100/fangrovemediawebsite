"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Play, X } from "lucide-react";
import type { Campaign } from "@/content/work";
import { services } from "@/content/services";
import { BLUR } from "@/lib/images";

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  services.map((service) => [service.slug, service.shortTitle]),
);

type Props = {
  film: Campaign;
  sizes?: string;
  priority?: boolean;
};

/**
 * A click-to-play facade over the campaign reel.
 *
 * Nothing from YouTube is requested until the play button is pressed — a page
 * of eleven live embeds would pull well over a megabyte of third-party script
 * and set cookies before anybody has asked to watch anything. The poster is a
 * local WebP served by next/image, so the grid costs roughly what a photo grid
 * costs, and the iframe is mounted only while the dialog is open (unmounting
 * it is also what stops playback on close).
 *
 * The overlay is a native <dialog> opened with showModal(), which brings focus
 * trapping, Escape-to-close, inert background content and top-layer stacking
 * for free — all of which a hand-rolled modal would have to reimplement, badly.
 * The only thing it does not handle is Lenis, which keeps scrolling the page
 * underneath unless it is explicitly stopped.
 */
export function FilmCard({ film, sizes = "(min-width: 1024px) 46vw, 92vw", priority = false }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const titleId = useId();

  const openFilm = useCallback(() => {
    setOpen(true);
    dialogRef.current?.showModal();
  }, []);

  const closeFilm = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Fires for Escape and for close() alike, so teardown lives in one place.
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [lenis, open]);

  // showModal() runs before React has rendered the dialog's children, so the
  // empty dialog element takes focus itself and paints a ring around the whole
  // overlay. Move focus to the close button once the content exists.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // A <dialog> fills its own box, so a click landing on the element itself —
  // rather than on any child — is a click on the backdrop.
  const handleBackdrop = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  }, []);

  return (
    <figure className="group">
      {/* The category chip is a label on the artwork, not part of the control.
          Kept outside the button so the button's only visible text is "Watch
          the film" — an accessible name that does not contain a control's own
          visible text is exactly what trips up voice-control users, who say
          what they see. */}
      <div className="relative">
        <button
          type="button"
          onClick={openFilm}
          className="media-reveal media-reveal-colour relative block aspect-video w-full cursor-pointer overflow-hidden rounded-[var(--radius-lg)] bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src={film.poster}
            alt={film.posterAlt}
            fill
            sizes={sizes}
            priority={priority}
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />

          {/* Darkens toward the bottom so the play affordance and the category
              chip stay legible over whatever the frame happens to contain. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-bg/25 opacity-80 transition-opacity duration-500 group-hover:opacity-95"
          />

          <span className="absolute bottom-5 left-5 flex items-center gap-3 text-label text-ink">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full border border-ink/45 bg-bg/45 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent group-hover:bg-accent"
            >
              <Play className="ml-0.5 size-4 fill-current text-ink transition-colors duration-300 group-hover:text-bg" />
            </span>
            Watch the film
            <span className="sr-only">
              {" "}
              — {film.client}: {film.title}
            </span>
          </span>
        </button>

        <span className="pointer-events-none absolute left-5 top-5 rounded-[var(--radius-sm)] bg-bg/75 px-3 py-1.5 text-label text-ink backdrop-blur-sm">
          {film.category}
        </span>
      </div>

      <figcaption className="mt-6">
        <div className="flex items-baseline gap-3">
          <span className="text-label text-accent">{film.client}</span>
          {film.year && <span className="nums text-label text-subtle">{film.year}</span>}
        </div>
        <p className="text-headline mt-3 max-w-md">{film.title}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {film.serviceSlugs.map((slug) => (
            <li
              key={slug}
              className="rounded-[var(--radius-full)] border border-line px-3 py-1.5 text-label text-subtle"
            >
              {SERVICE_LABELS[slug] ?? slug}
            </li>
          ))}
        </ul>
      </figcaption>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        onClick={handleBackdrop}
        aria-labelledby={titleId}
        // 138dvh is the width at which a 16:9 box is 78dvh tall, which keeps the
        // player and its header inside a short laptop viewport without needing
        // a resize listener.
        className="m-auto w-[min(92vw,72rem,138dvh)] max-w-none bg-transparent p-0 text-ink outline-none backdrop:bg-bg/92 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-6">
              <h2 id={titleId} className="text-headline">
                <span className="text-accent">{film.client}</span> — {film.title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={closeFilm}
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <X className="size-5" />
                <span className="sr-only">Close the film</span>
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={`${film.client} — ${film.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>
        )}
      </dialog>
    </figure>
  );
}
