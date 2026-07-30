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
      <h3 className="text-sm text-[#9aa5cc] mb-2">
        <span className="text-[#4a3a42]">$</span> best plays{" "}
        <span className="text-[#4a3a42]">({moves.length})</span>
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
                    ? "bg-[#241a20] border-[#9aa5cc]"
                    : "bg-[#1a1218] border-[#241a20] hover:border-[#3a2a30]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[#4a3a42] w-5 text-right">{i + 1}.</span>
                <span className="font-bold text-[#f2e0d3] tracking-wide truncate">
                  {m.word}
                </span>
                <span className="text-xs text-[#8a7080] shrink-0">
                  {m.dir === "H" ? "→" : "↓"} r{m.row + 1}·c{m.col + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[#b8bd8f] font-bold tabular-nums">
                  {m.score}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(m);
                  }}
                  className="text-xs px-2 py-1 rounded bg-[#3a2a30] text-[#f2e0d3] hover:bg-[#4a3a42] transition-colors"
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
