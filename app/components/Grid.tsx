import React from "react";

import { useState } from "react";

interface GridProps{
    board: string[][];
    setBoard: React.Dispatch<React.SetStateAction<string[][]>>;
}

// Make const const SudokuGrid: React.FC = () => { to turn into a component

const SudokuGrid: React.FC<GridProps> = ({board, setBoard}) => {
  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 50px)",
          gridTemplateRows: "repeat(9, 50px)",
        }}
      >
        {board.map((row, i) =>
        row.map((val, j) => (
          <input
            key={`${i}-${j}`}
            value={val}
            onChange={(e) => {
              const updated = board.map((r) => [...r]);
              updated[i][j] = e.target.value;
              setBoard(updated);
            }}
            maxLength={1}
            type="text"
            style={{
              width: "50px",
              height: "50px",
              textAlign: "center",
              fontSize: "1.2rem",
              outline: "none",
              backgroundColor: "white",
              borderTop: i % 3 === 0 ? "2px solid black" : "0.5px solid gray",
              borderLeft: j % 3 === 0 ? "2px solid black" : "0.5px solid gray",
              borderRight: j === 8 ? "2px solid black" : "",
              borderBottom: i === 8 ? "2px solid black" : "",
            }}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
