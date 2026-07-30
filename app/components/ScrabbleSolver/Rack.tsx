"use client";

import React from "react";
import { LETTER_VALUES, RACK_SIZE } from "@/app/lib/scrabble/board";

interface RackProps {
  tiles: string[]; // length RACK_SIZE; "" empty, "?" blank, else A-Z
  onChange: (index: number, value: string) => void;
}

// The player's rack: seven slots accepting a letter or "?" for a blank.
function Rack({ tiles, onChange }: RackProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {Array.from({ length: RACK_SIZE }).map((_, i) => {
        const value = tiles[i] ?? "";
        const isBlank = value === "?";
        return (
          <div key={i} className="relative w-10 h-11">
            <input
              aria-label={`rack tile ${i + 1}`}
              value={value}
              maxLength={1}
              placeholder="·"
              onChange={(e) => {
                const raw = e.target.value.slice(-1);
                if (raw === "?" || raw === "") {
                  onChange(i, raw);
                } else if (/[a-zA-Z]/.test(raw)) {
                  onChange(i, raw.toUpperCase());
                }
              }}
              className="w-full h-full text-center text-lg font-bold uppercase rounded
                bg-[#efefef] text-[#444444] border-2 border-[#e0e0e0]
                placeholder:text-[#e0e0e0] outline-none focus:border-[#ff6719] transition-colors"
            />
            {value && !isBlank && LETTER_VALUES[value] !== undefined && (
              <sub className="pointer-events-none absolute bottom-0.5 right-1 text-[8px] text-[#404040]">
                {LETTER_VALUES[value]}
              </sub>
            )}
            {isBlank && (
              <span className="pointer-events-none absolute bottom-0.5 right-1 text-[8px] text-[#6b6b6b]">
                0
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Rack;
