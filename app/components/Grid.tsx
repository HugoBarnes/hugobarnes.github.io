"use client";

import React from "react";

interface GridProps {
  board: string[][];
  setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
}

const SudokuGrid: React.FC<GridProps> = ({ board, setBoard }) => {
  return (
    <div
      className="bg-[#0a070b] p-[2px] rounded"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(9, minmax(0, 1fr))",
      }}
    >
      {board.map((row, i) =>
        row.map((val, j) => (
          <input
            key={`${i}-${j}`}
            value={val}
            onChange={(e) => {
              const v = e.target.value.replace(/[^1-9]/g, "");
              const updated = board.map((r) => [...r]);
              updated[i][j] = v;
              setBoard(updated);
            }}
            maxLength={1}
            inputMode="numeric"
            type="text"
            className="w-9 h-9 sm:w-11 sm:h-11 text-center text-lg outline-none
              bg-[#1a1218] text-[#f2c078] focus:bg-[#241a20] transition-colors"
            style={{
              borderTop: i % 3 === 0 ? "2px solid #8a7080" : "1px solid #241a20",
              borderLeft: j % 3 === 0 ? "2px solid #8a7080" : "1px solid #241a20",
              borderRight: j === 8 ? "2px solid #8a7080" : "",
              borderBottom: i === 8 ? "2px solid #8a7080" : "",
            }}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
