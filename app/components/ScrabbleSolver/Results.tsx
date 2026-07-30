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
      <h3 className="text-sm text-[#1a3e8c] mb-2">
        <span className="text-[#8e99ac]">$</span> best plays{" "}
        <span className="text-[#8e99ac]">({moves.length})</span>
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
                    ? "bg-[#e4e9f2] border-[#1a3e8c]"
                    : "bg-[#eef1f7] border-[#e4e9f2] hover:border-[#cfd7e4]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[#8e99ac] w-5 text-right">{i + 1}.</span>
                <span className="font-bold text-[#121722] tracking-wide truncate">
                  {m.word}
                </span>
                <span className="text-xs text-[#5b6577] shrink-0">
                  {m.dir === "H" ? "→" : "↓"} r{m.row + 1}·c{m.col + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[#2c4a86] font-bold tabular-nums">
                  {m.score}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(m);
                  }}
                  className="text-xs px-2 py-1 rounded bg-[#cfd7e4] text-[#121722] hover:bg-[#8e99ac] transition-colors"
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
