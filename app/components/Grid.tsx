"use client";

import React, { useRef } from "react";

interface GridProps {
  board: string[][];
  givens: boolean[][];
  conflicts: Set<string>;
  wrong: Set<string>;
  onInput: (row: number, col: number, value: string) => void;
}

const SudokuGrid: React.FC<GridProps> = ({ board, givens, conflicts, wrong, onInput }) => {
  const cellRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(null))
  );

  const focusCell = (row: number, col: number) => {
    const r = Math.min(8, Math.max(0, row));
    const c = Math.min(8, Math.max(0, col));
    cellRefs.current[r][c]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number, j: number) => {
    const given = givens[i][j];
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        focusCell(i - 1, j);
        return;
      case "ArrowDown":
        e.preventDefault();
        focusCell(i + 1, j);
        return;
      case "ArrowLeft":
        e.preventDefault();
        focusCell(i, j - 1);
        return;
      case "ArrowRight":
        e.preventDefault();
        focusCell(i, j + 1);
        return;
      case "Backspace":
      case "Delete":
        if (!given) onInput(i, j, "");
        return;
    }
    if (/^[1-9]$/.test(e.key) && !given) {
      e.preventDefault();
      onInput(i, j, e.key);
    }
  };

  const cellClasses = (i: number, j: number): string => {
    const key = `${i}-${j}`;
    const given = givens[i][j];
    if (conflicts.has(key)) return "bg-[var(--ss-error-bg)] text-[color:var(--ss-error)]";
    if (wrong.has(key)) return "bg-[var(--ss-accent-soft)] text-[color:var(--ss-error)]";
    if (given) return "bg-[var(--ss-bg-soft)] text-[color:var(--ss-text)] font-semibold";
    return "bg-[var(--ss-bg)] text-[color:var(--ss-accent)]";
  };

  return (
    <div
      className="bg-[var(--ss-bg)] p-[2px] rounded"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
      }}
    >
      {board.map((row, i) =>
        row.map((val, j) => (
          <input
            key={`${i}-${j}`}
            ref={(el) => {
              cellRefs.current[i][j] = el;
            }}
            value={val}
            readOnly={givens[i][j]}
            onChange={(e) => {
              if (givens[i][j]) return;
              const v = e.target.value.replace(/[^1-9]/g, "").slice(-1);
              onInput(i, j, v);
            }}
            onKeyDown={(e) => handleKeyDown(e, i, j)}
            maxLength={1}
            inputMode="numeric"
            type="text"
            aria-label={`Row ${i + 1}, column ${j + 1}`}
            className={`w-9 h-9 sm:w-11 sm:h-11 text-center text-lg outline-none cursor-pointer
              focus:bg-[var(--ss-rule)] transition-colors ${cellClasses(i, j)}`}
            style={{
              borderTop: i % 3 === 0 ? "2px solid var(--ss-gray)" : "1px solid var(--ss-rule)",
              borderLeft: j % 3 === 0 ? "2px solid var(--ss-gray)" : "1px solid var(--ss-rule)",
              borderRight: j === 8 ? "2px solid var(--ss-gray)" : "",
              borderBottom: i === 8 ? "2px solid var(--ss-gray)" : "",
            }}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
