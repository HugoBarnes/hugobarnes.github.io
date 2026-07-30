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
  TW: "bg-[#c9605c] text-[#f6ece2]",
  DW: "bg-[#b087a8] text-[#f6ece2]",
  TL: "bg-[#5f6a94] text-[#f6ece2]",
  DL: "bg-[#8d80ab] text-[#f6ece2]",
  "": "bg-[#1a1218] text-[#4a3a42]",
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
        className="grid gap-[2px] bg-[#0a070b] p-[2px] w-max mx-auto rounded"
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
                        ? "bg-[#3a2a30] text-[#f6ece2] border border-[#5c4a52]"
                        : `${PREMIUM_STYLE[prem]} border border-transparent focus:border-[#9aa5cc]`
                    }`}
                />

                {/* premium label on empty, non-preview squares */}
                {!filled && !previewTile && prem !== "" && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[8px] opacity-70">
                    {PREMIUM_LABEL[prem]}
                  </span>
                )}
                {!filled && !previewTile && isCenter && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] text-[#f6ece2]">
                    ★
                  </span>
                )}

                {/* suggested-move overlay */}
                {!filled && previewTile && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#b8bd8f] text-[#0a070b] text-sm font-bold ring-2 ring-[#f2c078]">
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
                  <sub className="pointer-events-none absolute bottom-0 right-[2px] text-[7px] text-[#d9c2ba]">
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
