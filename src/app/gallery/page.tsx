"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Rows,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Image Gallery — Vertical (masonry) & Horizontal (scroll rows)
 * ------------------------------------------------------------
 * Drop this file at: /app/gallery/page.tsx
 * TailwindCSS required. Uses next/image.
 *
 * Notes:
 * - Put your images under /public/images/gallery/... or use remote URLs.
 * - If you use remote images (e.g. Unsplash), add the domain to next.config.js:
 *     images: { remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }] }
 */

/** Types */
export type Orientation = "landscape" | "portrait" | "square";
export interface GalleryItem {
  id: string;
  src: string; // local path in /public or a remote URL allowed by next.config
  alt: string;
  title?: string;
  description?: string;
  orientation?: Orientation;
  tags?: string[];
}

/** Sample data — replace with your own */
const ITEMS: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery/1.jpeg",
    alt: "Family gathering at Eid",
    title: "Eid Morning",
    description: "Whole family gathered after Fajr prayers.",
    orientation: "landscape",
    tags: ["family", "eid", "home"],
  },
  {
    id: "g2",
    src: "/gallery/2.jpeg",
    alt: "Gravesite visit",
    title: "Ziyarat",
    description: "Visit to Wadi-e-Hussain cemetery.",
    orientation: "portrait",
    tags: ["ziyarat", "karachi"],
  },
  {
    id: "g3",
    src: "/gallery/3.jpeg",
    alt: "Old family house courtyard",
    title: "Courtyard",
    description: "The original Hussain family home courtyard.",
    orientation: "square",
    tags: ["heritage"],
  },
  {
    id: "g4",
    src: "/gallery/4.jpeg",
    alt: "Wedding stage",
    title: "Nikah Ceremony",
    description: "Rukhsati night at the community hall.",
    orientation: "landscape",
    tags: ["wedding"],
  },
  {
    id: "g5",
    src: "/gallery/5.jpeg",
    alt: "Portrait of Nana Abbu",
    title: "Khadim Hussain (RA)",
    description: "Beloved head of the family tree.",
    orientation: "portrait",
    tags: ["portrait", "history"],
  },
  {
    id: "g6",
    src: "/gallery/6.jpeg",
    alt: "Family gathering at Eid",
    title: "Eid Morning",
    description: "Whole family gathered after Fajr prayers.",
    orientation: "landscape",
    tags: ["family", "eid", "home"],
  },
  {
    id: "g7",
    src: "/gallery/7.jpeg",
    alt: "Gravesite visit",
    title: "Ziyarat",
    description: "Visit to Wadi-e-Hussain cemetery.",
    orientation: "portrait",
    tags: ["ziyarat", "karachi"],

  },
  {
    id: "g8",
    src: "/gallery/8.jpeg",
    alt: "Old family house courtyard",
    title: "Courtyard",
    description: "The original Hussain family home courtyard.",
    orientation: "square",
    tags: ["heritage"],
  },
  {
    id: "g9",
    src: "/gallery/9.jpeg",
    alt: "Wedding stage",
    title: "Nikah Ceremony",
    description: "Rukhsati night at the community hall.",
    orientation: "landscape",
    tags: ["wedding"],
  },
];

/** Helpers */
function clsx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function chip(text: string) {
  return (
    <span key={text} className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
      <Tag className="h-3 w-3" /> {text}
    </span>
  );
}

const sizeByOrientation: Record<Orientation, string> = {
  landscape: "w-[460px] h-[300px]",
  portrait: "w-[300px] h-[460px]",
  square: "w-[360px] h-[360px]",
};

/* Lightbox */
function Lightbox({
  items,
  index,
  onClose,
  setIndex,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}) {
  const item = items[index];
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, setIndex]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        aria-label="Previous"
        onClick={() => setIndex((index - 1 + items.length) % items.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <figure className="max-h-[82vh] max-w-[92vw]">
        <div className="relative mx-auto aspect-[4/3] max-h-[70vh] w-[min(90vw,1100px)]">
          <Image src={item.src} alt={item.alt} fill sizes="90vw" className="rounded-xl object-contain" />
        </div>
        {(item.title || item.description) && (
          <figcaption className="mt-3 text-center text-sm text-slate-200">
            {item.title && <div className="font-semibold">{item.title}</div>}
            {item.description && <div className="opacity-80">{item.description}</div>}
            {item.tags && item.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {item.tags.map(chip)}
              </div>
            )}
          </figcaption>
        )}
      </figure>

      <button
        aria-label="Next"
        onClick={() => setIndex((index + 1) % items.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
    </div>
  );
}

/* Gallery Item Card */
function Card({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <figure className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      {/* overlay */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="text-sm text-white">
          {item.title && <div className="font-semibold">{item.title}</div>}
          {item.description && <div className="opacity-90">{item.description}</div>}
        </div>
      </figcaption>
      <button
        onClick={onClick}
        className="absolute inset-0"
        aria-label={`Open ${item.title || item.alt}`}
      />
    </figure>
  );
}

function HorizontalTile({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const orient = item.orientation || "landscape";
  return (
    <figure
      className={clsx(
        "relative shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        sizeByOrientation[orient]
      )}
    >
      <Image src={item.src} alt={item.alt} fill sizes="50vw" className="object-cover" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
        <div className="text-xs text-white">
          {item.title && <div className="font-medium leading-tight">{item.title}</div>}
          {item.description && <div className="opacity-90">{item.description}</div>}
        </div>
      </figcaption>
      <button onClick={onClick} aria-label={`Open ${item.title || item.alt}`} className="absolute inset-0" />
    </figure>
  );
}

export default function GalleryPage() {
//   const [layout, setLayout] = useState<"vertical" | "horizontal">("vertical");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(() => ITEMS, []);
  const router = useRouter();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1 text-sm shadow-sm hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Image Gallery</h1>
          </div>
        </div>
      </header>

      {/* Optional tags legend */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
          <Info className="h-3.5 w-3.5" /> Sample tags:
        </span>
        {[...new Set(items.flatMap((i) => i.tags || []))].slice(0, 6).map(chip)}
      </div>

      
    
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, idx) => (
            <Card key={item.id} item={item} onClick={() => setLightboxIndex(idx)} />
          ))}
        </div>
    

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          setIndex={(i) => setLightboxIndex(i)}
        />
      )}

    
    </div>
  );
}
