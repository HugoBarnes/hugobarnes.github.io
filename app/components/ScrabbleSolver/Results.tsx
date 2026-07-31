"use client";

import React from "react";
import type { Move } from "@/app/lib/scrabble/solver";

interface ResultsProps {
  moves: Move[];
  selected: number | null;
  onSelect: (index: number | null) => void;
  onApply: (move: Move) => void;
}

// Ranked list of suggested plays. Hovering/selecting previews the play on the
// board; "place" commits it.
function Results({ moves, selected, onSelect, onApply }: ResultsProps) {
  if (moves.length === 0) return null;

  return (
    <div className="mt-2">
      <h3 className="text-sm text-[color:var(--ss-accent)] mb-2">
        <span className="text-[color:var(--ss-muted)]">$</span> best plays{" "}
        <span className="text-[color:var(--ss-muted)]">({moves.length})</span>
      </h3>
      <ol className="space-y-1">
        {moves.map((m, i) => {
          const active = selected === i;
          return (
            <li
              key={`${m.word}-${m.row}-${m.col}-${m.dir}`}
              onMouseEnter={() => onSelect(i)}
              onMouseLeave={() => onSelect(null)}
              className={`flex items-center justify-between gap-3 rounded px-3 py-2 text-sm cursor-pointer border transition-colors
                ${
                  active
                    ? "bg-[var(--ss-rule)] border-[color:var(--ss-accent)]"
                    : "bg-[var(--ss-bg-soft)] border-[color:var(--ss-rule)] hover:border-[color:var(--ss-rule-dark)]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[color:var(--ss-muted)] w-5 text-right">{i + 1}.</span>
                <span className="font-bold text-[color:var(--ss-text)] tracking-wide truncate">
                  {m.word}
                </span>
                <span className="text-xs text-[color:var(--ss-gray)] shrink-0">
                  {m.dir === "H" ? "→" : "↓"} r{m.row + 1}·c{m.col + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[color:var(--ss-text-soft)] font-bold tabular-nums">
                  {m.score}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(m);
                  }}
                  className="text-xs px-2 py-1 rounded bg-[var(--ss-rule-dark)] text-[color:var(--ss-text)] hover:bg-[var(--ss-muted)] transition-colors"
                >
                  place
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Results;
