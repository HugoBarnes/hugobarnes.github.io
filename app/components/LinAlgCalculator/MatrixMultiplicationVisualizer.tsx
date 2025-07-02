"use client";

import React, { useState, useEffect } from "react";

interface MatrixMultiplicationVisualizerProps {
  rowsA: number;
  colsA: number;
  rowsB: number;
  colsB: number;
}

const MatrixMultiplicationVisualizer: React.FC<MatrixMultiplicationVisualizerProps> = ({
  rowsA,
  colsA,
  rowsB,
  colsB,
}) => {
  const [matrixA, setMatrixA] = useState<string[][]>([]);
  const [matrixB, setMatrixB] = useState<string[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setResult(null);
    setError("");
    if (colsA !== rowsB) {
      setError(
        `Matrix multiplication not possible: columns of A: (${colsA}) must equal rows of B: (${rowsB})`
      );
    }

    setMatrixA(
      Array.from({ length: rowsA }, () => Array.from({ length: colsA }, () => ""))
    );
    setMatrixB(
      Array.from({ length: rowsB }, () => Array.from({ length: colsB }, () => ""))
    );
  }, [rowsA, colsA, rowsB, colsB]);

  const handleInputChange = (
    matrix: "A" | "B",
    row: number,
    col: number,
    value: string
  ) => {
    if (matrix === "A") {
      const newMatrix = matrixA.map((r) => r.slice());
      newMatrix[row][col] = value;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = matrixB.map((r) => r.slice());
      newMatrix[row][col] = value;
      setMatrixB(newMatrix);
    }
  };

  const parseNumber = (val: string): number => {
    const trimmed = val.trim();
    if (trimmed.includes("/")) {
      const [numerator, denominator] = trimmed.split("/").map(Number);
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return NaN;
      return numerator / denominator;
    }
    const parsed = parseFloat(trimmed);
    return isNaN(parsed) ? NaN : parsed;
  };

  const computeMultiplication = () => {
    setError("");
    if (colsA !== rowsB) {
      setError(
        `Matrix multiplication not possible: columns of A (${colsA}) must equal rows of B (${rowsB})`
      );
      setResult(null);
      return;
    }

    let invalidInput = false;
    const parsedA = matrixA.map((row) =>
      row.map((val) => {
        const n = parseNumber(val);
        if (isNaN(n)) {
          invalidInput = true;
          return 0;
        }
        return n;
      })
    );
    const parsedB = matrixB.map((row) =>
      row.map((val) => {
        const n = parseNumber(val);
        if (isNaN(n)) {
          invalidInput = true;
          return 0;
        }
        return n;
      })
    );

    if (invalidInput) {
      setError("Matrices contain invalid numbers or fractions.");
      setResult(null);
      return;
    }

    const res: number[][] = Array.from({ length: rowsA }, () =>
      Array.from({ length: colsB }, () => 0)
    );

    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        for (let k = 0; k < colsA; k++) {
          res[i][j] += parsedA[i][k] * parsedB[k][j];
        }
      }
    }
    setResult(res);
  };

  const fillZeros = (matrix: "A" | "B") => {
    if (matrix === "A") {
      setMatrixA((prev) =>
        prev.map((row) => row.map((val) => (val.trim() === "" ? "0" : val)))
      );
    } else {
      setMatrixB((prev) =>
        prev.map((row) => row.map((val) => (val.trim() === "" ? "0" : val)))
      );
    }
  };

  const clearMatrix = (matrix: "A" | "B") => {
    if (matrix === "A") {
      setMatrixA(Array.from({ length: rowsA }, () => Array.from({ length: colsA }, () => "")));
    } else {
      setMatrixB(Array.from({ length: rowsB }, () => Array.from({ length: colsB }, () => "")));
    }
  };

  const swapMatrices = () => {
    if (rowsA !== rowsB || colsA !== colsB) {
      setError("Swap failed: matrices must have the same dimensions.");
      return;
    }
    setMatrixA(matrixB.map((row) => row.slice()));
    setMatrixB(matrixA.map((row) => row.slice()));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button
          className="bg-black text-white px-4 py-2 rounded-none hover:underline hover:cursor-pointer"
          onClick={computeMultiplication}
          disabled={rowsA === 0 || colsA === 0 || rowsB === 0 || colsB === 0}
        >
          Multiply Matrices
        </button>
        <button
          className="bg-black text-white px-4 py-1 hover:cursor-pointer hover:underline"
          onClick={swapMatrices}
        >
          Swap Matrix A with B
        </button>
      </div>

      <div className="flex justify-center items-start gap-8">
        {/* Matrix A */}
        <div>
          <h3 className="font-semibold mb-1">
            Matrix A ({rowsA} x {colsA})
          </h3>
          <table className="table-auto border-collapse border border-black">
            <tbody>
              {matrixA.map((row, r) => (
                <tr key={r}>
                  {row.map((value, c) => (
                    <td key={c} className="border border-black-300 p-1">
                      <input
                        type="text"
                        className="w-14 h-8 text-sm text-center border rounded"
                        value={value}
                        onChange={(e) => handleInputChange("A", r, c, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 mt-2">
            <button
              className="text-sm bg-black text-white px-2 py-1 hover:cursor-pointer hover:underline"
              onClick={() => fillZeros("A")}
            >
              Fill Empty with 0
            </button>
            <button
              className="text-sm bg-black text-white px-2 py-1 hover:cursor-pointer hover:underline"
              onClick={() => clearMatrix("A")}
            >
              Clear Matrix
            </button>
          </div>
        </div>

        {/* Matrix B */}
        <div>
          <h3 className="font-semibold mb-1">
            Matrix B ({rowsB} x {colsB})
          </h3>
          <table className="table-auto border-collapse border border-black">
            <tbody>
              {matrixB.map((row, r) => (
                <tr key={r}>
                  {row.map((value, c) => (
                    <td key={c} className="border border-black-300 p-1">
                      <input
                        type="text"
                        className="w-14 h-8 text-sm text-center border rounded"
                        value={value}
                        onChange={(e) => handleInputChange("B", r, c, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 mt-2">
            <button
              className="text-sm bg-black text-white px-2 py-1 hover:cursor-pointer hover:underline"
              onClick={() => fillZeros("B")}
            >
              Fill Empty with 0
            </button>
            <button
              className="text-sm bg-black text-white px-2 py-1 hover:cursor-pointer hover:underline"
              onClick={() => clearMatrix("B")}
            >
              Clear Matrix
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {result && (
        <div className="flex justify-center mt-4">
          <div>
            <h3 className="font-semibold mb-1 text-center">
              Result Matrix ({rowsA} x {colsB})
            </h3>
            <table className="table-auto border-collapse border border-black-300 mx-auto">
              <tbody>
                {result.map((row, r) => (
                  <tr key={r}>
                    {row.map((val, c) => (
                      <td
                        key={c}
                        className="border border-black-300 p-2 text-center"
                      >
                        {val.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixMultiplicationVisualizer;
