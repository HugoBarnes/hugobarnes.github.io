"use client";

import React from "react";
import { formatNumber } from "@/app/lib/linalg/number";

interface ResultMatrixProps {
  label?: string;
  matrix: number[][];
}

// Bracketed, monospaced display of a result matrix.
export default function ResultMatrix({ label, matrix }: ResultMatrixProps) {
  const cols = matrix[0]?.length ?? 0;
  return (
    <div className="flex flex-col items-center">
      {label && <h3 className="text-sm text-[#444444] mb-2">{label}</h3>}
      <div className="flex items-stretch">
        <Bracket side="left" />
        <div
          className="grid gap-x-4 gap-y-1.5 px-3 py-2"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {matrix.map((row, r) =>
            row.map((value, c) => (
              <span
                key={`${r}-${c}`}
                className="min-w-10 text-center text-sm text-[#1c1c1c] tabular-nums"
              >
                {formatNumber(value)}
              </span>
            ))
          )}
        </div>
        <Bracket side="right" />
      </div>
    </div>
  );
}

function Bracket({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`w-2 border-y-2 border-[#4a4a4a] ${
        side === "left" ? "border-l-2 rounded-l" : "border-r-2 rounded-r"
      }`}
    />
  );
}
