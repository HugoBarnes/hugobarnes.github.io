"use client";

import React, { useState, useEffect } from "react";

interface MatrixPowerProps {
  rows: number;
  cols: number;
  power: number;
}

const MatrixPower: React.FC<MatrixPowerProps> = ({ rows, cols, power }) => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setMatrix(
      Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
    );
  }, [rows, cols]);

  const handleInputChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map((r) => r.slice());
    newMatrix[row][col] = value;
    setMatrix(newMatrix);
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

  const multiplyMatrices = (A: number[][], B: number[][]): number[][] => {
    const n = A.length;
    const m = B[0].length;
    const p = B.length; // A's cols == B's rows

    const result = Array.from({ length: n }, () => Array(m).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < p; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return result;
  };

  const computePower = () => {
    setError("");
    if (rows !== cols) {
      setError(
        `Matrix Power is impossible. The matrix must be square. Currently the dimensions are: (${rows}x${cols})`
      );
      setResult(null);
      return;
    }
    let invalidInput = false;
    const parsed = matrix.map((row) =>
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
      setError("At least one cell in the matrix is not a number.");
      setResult(null);
      return;
    }

    if (power === 0) {
      const identity = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => (i === j ? 1 : 0))
      );
      setResult(identity);
      return;
    }

    if (power === 1) {
      setResult(parsed);
      return;
    }

    let res = parsed;
    for (let i = 1; i < power; i++) {
      res = multiplyMatrices(res, parsed);
    }

    setResult(res);
  };

  const fillZeros = () => {
    setMatrix((prev) =>
      prev.map((row) => row.map((val) => (val.trim() === "" ? "0" : val)))
    );
  };

  const clearMatrix = () => {
    setMatrix(
      Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button
          className="bg-black text-white px-4 py-2 rounded-none hover:underline hover:cursor-pointer"
          onClick={computePower}
          disabled={rows === 0 || cols === 0}
        >
          Matrix Power
        </button>
      </div>

      <div className="flex justify-center items-start gap-8">
        <div>
          <h3 className="font-semibold mb-1">
            Matrix ({rows} x {cols})
          </h3>
          <table className="table-auto border-collapse border border-black">
            <tbody>
              {matrix.map((row, r) => (
                <tr key={r}>
                  {row.map((value, c) => (
                    <td key={c} className="border border-black-300 p-1">
                      <input
                        type="text"
                        className="w-14 h-8 text-sm text-center border rounded"
                        value={value}
                        onChange={(e) => handleInputChange(r, c, e.target.value)}
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
              onClick={fillZeros}
            >
              Fill Empty with 0
            </button>
            <button
              className="text-sm bg-black text-white px-2 py-1 hover:cursor-pointer hover:underline"
              onClick={clearMatrix}
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
              Result Matrix ({rows} x {cols})
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

export default MatrixPower;
