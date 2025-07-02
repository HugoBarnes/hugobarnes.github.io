import React from "react";

interface MatrixProps {
  matrix: number[][];
  setMatrix: (matrix: number[][]) => void;
}

export default function Matrix({ matrix, setMatrix }: MatrixProps) {
  const handleChange = (value: string, row: number, col: number) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? Number(value) : c))
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="space-y-1">
      {matrix.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map((value, j) => (
            <input
              key={j}
              type="number"
              value={value}
              onChange={(e) => handleChange(e.target.value, i, j)}
              className="w-12 h-8 text-sm text-center border rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
