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
      <h3 className="text-sm text-[#ff6719] mb-2">
        <span className="text-[#a0a0a0]">$</span> best plays{" "}
        <span className="text-[#a0a0a0]">({moves.length})</span>
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
                    ? "bg-[#efefef] border-[#ff6719]"
                    : "bg-[#fafafa] border-[#efefef] hover:border-[#e0e0e0]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[#a0a0a0] w-5 text-right">{i + 1}.</span>
                <span className="font-bold text-[#1c1c1c] tracking-wide truncate">
                  {m.word}
                </span>
                <span className="text-xs text-[#6b6b6b] shrink-0">
                  {m.dir === "H" ? "→" : "↓"} r{m.row + 1}·c{m.col + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[#4a4a4a] font-bold tabular-nums">
                  {m.score}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(m);
                  }}
                  className="text-xs px-2 py-1 rounded bg-[#e0e0e0] text-[#1c1c1c] hover:bg-[#a0a0a0] transition-colors"
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
