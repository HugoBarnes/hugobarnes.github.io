"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* The two featured projects as a comic strip whose panels are drawn
   stroke-by-stroke, the way the plotter itself would draw them. Each
   <path> carries pathLength=1 so one keyframe animates any shape. */

interface Stroke {
  d: string;
  delay: number; // seconds into the drawing
  duration: number;
  accent?: boolean;
}

const BOOK_STROKES: Stroke[] = [
  // open book, spine centered
  { d: "M200,128 C160,112 100,116 70,132 L70,222 C100,206 160,202 200,216 Z", delay: 0, duration: 0.9 },
  { d: "M200,128 C240,112 300,116 330,132 L330,222 C300,206 240,202 200,216 Z", delay: 0.9, duration: 0.9 },
  { d: "M200,128 L200,216", delay: 1.8, duration: 0.25 },
  // text lines on the pages
  { d: "M92,150 C120,140 158,139 186,148", delay: 2.05, duration: 0.3 },
  { d: "M92,172 C120,162 158,161 186,170", delay: 2.35, duration: 0.3 },
  { d: "M214,148 C242,139 280,140 308,150", delay: 2.65, duration: 0.3 },
  { d: "M214,170 C242,161 280,162 308,172", delay: 2.95, duration: 0.3 },
  // sparkles overhead — the stargazing sky
  { d: "M120,72 L120,92 M110,82 L130,82", delay: 3.25, duration: 0.25, accent: true },
  { d: "M205,46 L205,70 M193,58 L217,58", delay: 3.5, duration: 0.3, accent: true },
  { d: "M290,80 L290,96 M282,88 L298,88", delay: 3.8, duration: 0.2, accent: true },
];

const PLOTTER_STROKES: Stroke[] = [
  // frame and rails
  { d: "M48,56 L352,56 L352,244 L48,244 Z", delay: 0, duration: 1.0 },
  { d: "M76,72 L76,228", delay: 1.0, duration: 0.35 },
  { d: "M324,72 L324,228", delay: 1.35, duration: 0.35 },
  // crossbar and carriage
  { d: "M76,112 L324,112", delay: 1.7, duration: 0.4 },
  { d: "M198,98 L246,98 L246,126 L198,126 Z", delay: 2.1, duration: 0.45 },
  // pen down from the carriage
  { d: "M222,126 L222,152 L217,162 L227,162 L222,152", delay: 2.55, duration: 0.35 },
  // the spiral it is drawing
  {
    d: "M222,186 a5,5 0 1,1 -10,0 a10,10 0 1,1 20,0 a15,15 0 1,1 -30,0 a20,20 0 1,1 40,0",
    delay: 2.9,
    duration: 1.3,
    accent: true,
  },
];

function Panel({
  href,
  title,
  blurb,
  strokes,
  drawn,
  viewTitle,
}: {
  href: string;
  title: string;
  blurb: string;
  strokes: Stroke[];
  drawn: boolean;
  viewTitle: string;
}) {
  return (
    <Link href={href} className="group block no-underline hover:no-underline">
      <figure
        className="rounded-md border-2 border-[color:var(--ss-text-soft)]
          group-hover:border-[color:var(--ss-accent)] bg-[var(--ss-bg-soft)]
          transition-colors overflow-hidden"
      >
        <svg
          viewBox="0 0 400 300"
          role="img"
          aria-label={viewTitle}
          className={`w-full block ${drawn ? "strip-drawn" : "strip-pending"}`}
        >
          {strokes.map((s, i) => (
            <path
              key={i}
              d={s.d}
              pathLength={1}
              className={s.accent ? "strip-path strip-accent" : "strip-path"}
              style={{
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </svg>
        <figcaption
          className="border-t-2 border-[color:var(--ss-text-soft)]
            group-hover:border-[color:var(--ss-accent)] transition-colors
            px-4 py-3 text-left"
        >
          <span className="block text-base text-[color:var(--ss-text)] group-hover:text-[color:var(--ss-accent)] transition-colors">
            <span className="text-[color:var(--ss-muted)]">&gt;</span> {title}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-[color:var(--ss-gray)]">
            {blurb}
          </span>
        </figcaption>
      </figure>
    </Link>
  );
}

export default function ProjectStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  // Start plotting when the strip scrolls into view, once.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <style>{`
        .strip-path {
          fill: none;
          stroke: var(--ss-text-soft);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .strip-accent { stroke: var(--ss-accent); }
        .strip-pending .strip-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        .strip-drawn .strip-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation-name: strip-draw;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes strip-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .strip-pending .strip-path,
          .strip-drawn .strip-path {
            animation: none;
            stroke-dasharray: none;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <Panel
        href="/Projects/CalvinAndHobbes"
        title="calvin-and-hobbes reader"
        blurb="The complete collection from the Internet Archive, readable in the browser."
        strokes={BOOK_STROKES}
        drawn={drawn}
        viewTitle="Line drawing of an open book under sparkling stars"
      />
      <Panel
        href="/Projects/DrawingMachine"
        title="automaton — drawing machine"
        blurb="A 3D-printed, Arduino-powered pen plotter. This strip is drawn the way it draws."
        strokes={PLOTTER_STROKES}
        drawn={drawn}
        viewTitle="Line drawing of a pen plotter drawing a spiral"
      />
    </div>
  );
}
