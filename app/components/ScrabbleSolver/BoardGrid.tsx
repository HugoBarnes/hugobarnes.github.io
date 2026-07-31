"use client";

import React from "react";
import {
  BOARD_SIZE,
  LETTER_VALUES,
  premiumAt,
  type Premium,
} from "@/app/lib/scrabble/board";

export interface PreviewTile {
  letter: string;
  blank: boolean;
}

interface BoardGridProps {
  board: string[][];
  preview: Map<string, PreviewTile>;
  onChange: (row: number, col: number, value: string) => void;
}

// Gruvbox-toned premium colours, dark enough that light tile text stays legible.
const PREMIUM_STYLE: Record<Premium, string> = {
  TW: "bg-[var(--ss-text)] text-[color:var(--ss-text)]",
  DW: "bg-[var(--ss-text-soft)] text-[color:var(--ss-text)]",
  TL: "bg-[var(--ss-accent-dark)] text-[color:var(--ss-text)]",
  DL: "bg-[var(--ss-text-soft)] text-[color:var(--ss-text)]",
  "": "bg-[var(--ss-bg-soft)] text-[color:var(--ss-muted)]",
};

const PREMIUM_LABEL: Record<Premium, string> = {
  TW: "3W",
  DW: "2W",
  TL: "3L",
  DL: "2L",
  "": "",
};

const CENTER = Math.floor(BOARD_SIZE / 2);

function BoardGrid({ board, preview, onChange }: BoardGridProps) {
  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-[2px] bg-[var(--ss-bg)] p-[2px] w-max mx-auto rounded"
        style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
      >
        {board.map((row, r) =>
          row.map((value, c) => {
            const prem = premiumAt(r, c);
            const previewTile = preview.get(`${r},${c}`);
            const filled = value !== "";
            const isCenter = r === CENTER && c === CENTER;

            return (
              <div key={`${r}-${c}`} className="relative w-7 h-7 sm:w-8 sm:h-8">
                <input
                  aria-label={`row ${r + 1} column ${c + 1}`}
                  value={value}
                  maxLength={1}
                  onChange={(e) =>
                    onChange(r, c, e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase())
                  }
                  className={`w-full h-full text-center text-sm font-bold uppercase outline-none transition-colors
                    ${
                      filled
                        ? "bg-[var(--ss-rule-dark)] text-[color:var(--ss-text)] border border-[color:var(--ss-muted)]"
                        : `${PREMIUM_STYLE[prem]} border border-transparent focus:border-[color:var(--ss-accent)]`
                    }`}
                />

                {/* premium label on empty, non-preview squares */}
                {!filled && !previewTile && prem !== "" && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8px] opacity-70">
                    {PREMIUM_LABEL[prem]}
                  </span>
                )}
                {!filled && !previewTile && isCenter && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] text-[color:var(--ss-text)]">
                    ★
                  </span>
                )}

                {/* suggested-move overlay */}
                {!filled && previewTile && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--ss-text-soft)] text-[color:var(--ss-bg)] text-sm font-bold ring-2 ring-[var(--ss-text-soft)]">
                    {previewTile.letter}
                    {!previewTile.blank && (
                      <sub className="absolute bottom-0 right-[2px] text-[7px]">
                        {LETTER_VALUES[previewTile.letter]}
                      </sub>
                    )}
                  </span>
                )}

                {/* value of an existing tile */}
                {filled && LETTER_VALUES[value] !== undefined && (
                  <sub className="pointer-events-none absolute bottom-0 right-[2px] text-[7px] text-[color:var(--ss-text-soft)]">
                    {LETTER_VALUES[value]}
                  </sub>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BoardGrid;
