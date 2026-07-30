"use client";

import React from "react";

interface MatrixInputProps {
  label: string;
  matrix: string[][];
  onChange: (row: number, col: number, value: string) => void;
  onFill?: () => void;
  onClear?: () => void;
}

// A polished, reusable matrix-entry grid with bracket styling and optional
// fill/clear controls. Used by every operation so the calculator looks uniform.
export default function MatrixInput({
  label,
  matrix,
  onChange,
  onFill,
  onClear,
}: MatrixInputProps) {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm text-[#ff6719] mb-2">{label}</h3>
      <div className="flex items-stretch">
        <Bracket side="left" />
        <div
          className="grid gap-1.5 px-2 py-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {matrix.map((row, r) =>
            row.map((value, c) => (
              <input
                key={`${r}-${c}`}
                type="text"
                inputMode="decimal"
                value={value}
                aria-label={`${label} entry ${r + 1},${c + 1}`}
                onChange={(e) => onChange(r, c, e.target.value)}
                className="w-12 h-10 text-sm text-center rounded bg-[#fafafa] text-[#1c1c1c]
                  border border-[#e0e0e0] outline-none focus:border-[#ff6719] transition-colors tabular-nums"
              />
            ))
          )}
        </div>
        <Bracket side="right" />
      </div>
      <p className="mt-1 text-[10px] text-[#a0a0a0]">
        {rows} × {cols}
      </p>
      {(onFill || onClear) && (
        <div className="flex gap-2 mt-2">
          {onFill && (
            <button
              onClick={onFill}
              className="text-xs px-2.5 py-1 rounded bg-[#efefef] text-[#404040] hover:bg-[#e0e0e0] transition-colors"
            >
              Fill 0
            </button>
          )}
          {onClear && (
            <button
              onClick={onClear}
              className="text-xs px-2.5 py-1 rounded bg-[#efefef] text-[#404040] hover:bg-[#e0e0e0] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Bracket({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`w-2 border-y-2 border-[#8a8a8a] ${
        side === "left" ? "border-l-2 rounded-l" : "border-r-2 rounded-r"
      }`}
    />
  );
}
