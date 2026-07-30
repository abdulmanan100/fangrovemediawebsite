"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MediaSite } from "@/content/sites";

/**
 * Leaflet with CARTO's dark_matter basemap — free, no API key, no account,
 * and already the right value for a near-black design system.
 *
 * This module must only ever be loaded via next/dynamic with ssr:false;
 * Leaflet touches `window` at import time.
 */

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png";
const LABEL_URL = "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

/** Gold pin for available inventory, grey for booked, larger when active. */
function markerIcon(site: MediaSite, active: boolean): L.DivIcon {
  const colour = site.status === "available" ? "#c8a24a" : "#6f6d67";
  const size = active ? 22 : 14;
  const ring = active
    ? `<span style="position:absolute;inset:-9px;border:1px solid ${colour};border-radius:999px;opacity:.55"></span>`
    : "";

  return L.divIcon({
    className: "fg-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html:
      `<span style="position:relative;display:block;width:${size}px;height:${size}px">` +
      ring +
      `<span style="position:absolute;inset:0;background:${colour};border-radius:999px;` +
      `border:2px solid #0a0a0a;box-shadow:0 0 0 1px ${colour}66"></span>` +
      `</span>`,
  });
}

/** Refits the viewport whenever the filtered set changes. */
function FitBounds({ sites }: { sites: readonly MediaSite[] }) {
  const map = useMap();
  const signature = sites.map((site) => site.id).join(",");

  useEffect(() => {
    if (sites.length === 0) return;

    if (sites.length === 1) {
      map.setView(sites[0]!.coords, 13, { animate: true });
      return;
    }

    map.fitBounds(L.latLngBounds(sites.map((site) => site.coords)), {
      padding: [56, 56],
      maxZoom: 12,
      animate: true,
    });
    // Refit only when the *set* changes, not on every parent render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, map]);

  return null;
}

/** Pans to the active site without changing zoom, when one is selected. */
function PanToActive({ site }: { site: MediaSite | null }) {
  const map = useMap();
  useEffect(() => {
    if (site) map.panTo(site.coords, { animate: true, duration: 0.6 });
  }, [site, map]);
  return null;
}

type Props = {
  sites: readonly MediaSite[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
};

export default function NetworkMap({ sites, activeId, onSelect, onHover }: Props) {
  const active = useMemo(
    () => sites.find((site) => site.id === activeId) ?? null,
    [sites, activeId],
  );
  const initialised = useRef(false);

  return (
    <MapContainer
      center={[31.5127, 74.3506]}
      zoom={11}
      scrollWheelZoom={false}
      zoomControl
      className="size-full"
      // Leaflet's own keyboard handling conflicts with the page's tab order;
      // the site list beside the map is the accessible path to every marker.
      keyboard={false}
      whenReady={() => {
        initialised.current = true;
      }}
    >
      <TileLayer url={TILE_URL} attribution={ATTRIBUTION} maxZoom={19} />
      <TileLayer url={LABEL_URL} maxZoom={19} opacity={0.55} />

      <FitBounds sites={sites} />
      <PanToActive site={active} />

      {sites.map((site) => (
        <Marker
          key={site.id}
          position={site.coords}
          icon={markerIcon(site, site.id === activeId)}
          zIndexOffset={site.id === activeId ? 1000 : 0}
          eventHandlers={{
            click: () => onSelect(site.id),
            mouseover: () => onHover(site.id),
            mouseout: () => onHover(null),
          }}
          // Markers are decorative duplicates of the list; the list is the
          // accessible interface, so keep them out of the tab order.
          keyboard={false}
          alt={site.name}
        />
      ))}
    </MapContainer>
  );
}
