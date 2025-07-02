"use client";
import React, { useState, useEffect } from "react";

interface DotProductProps {
  rowsA: number;
  colsA: number;
  rowsB: number;
  colsB: number;
}

const DotProduct: React.FC<DotProductProps> = ({
  rowsA,
  colsA,
  rowsB,
  colsB,
}) => {
  const [matrixA, setMatrixA] = useState<string[][]>([]);
  const [matrixB, setMatrixB] = useState<string[][]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setResult(null);
    setError("");
    if (rowsA !== rowsB || colsA !== colsB) {
      setError(
        `Dot Product Takes Two Equal Length Sequences of Numbers ( i.e. co-ordinate vectors)`
      );
    }
    setMatrixA(
      Array.from({ length: rowsA }, () =>
        Array.from({ length: colsA }, () => "")
      )
    );
    setMatrixB(
      Array.from({ length: rowsB }, () =>
        Array.from({ length: colsB }, () => "")
      )
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
      if (isNaN(numerator) || isNaN(denominator) || denominator === 0)
        return NaN;
      return numerator / denominator;
    }
    const parsed = parseFloat(trimmed);
    return isNaN(parsed) ? NaN : parsed;
  };

  const computeDotProduct = () => {
    setError("");
    if (rowsA !== rowsB || colsA !== 1 || colsB !== 1) {
      setError(
        `Dot Product Takes Two Equal Length Sequences of Numbers ( i.e. co-ordinate vectors)`
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
      setError("Matrices contain invalid numbers or fractions");
      setResult(null);
      return;
    }

    let res = 0;
    for (let i = 0; i < rowsA; i++) {
      res += parsedA[i][0] * parsedB[i][0];
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
      setMatrixA(
        Array.from({ length: rowsA }, () =>
          Array.from({ length: colsA }, () => "")
        )
      );
    } else {
      setMatrixB(
        Array.from({ length: rowsB }, () =>
          Array.from({ length: colsB }, () => "")
        )
      );
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div className="flex justify-center gap-4">
        <button
          className="bg-black text-white px-6 py-2 rounded hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={computeDotProduct}
          disabled={
            rowsA <= 0 ||
            colsA !== 1 ||
            rowsB <= 0 ||
            colsB !== 1 ||
            rowsA !== rowsB
          }        >
          Compute Dot Product
        </button>
      </div>

      <div className="flex justify-center gap-12">
        {/* Matrix A */}
        <div>
          <h3 className="font-semibold mb-2 text-center">
            Matrix A ({rowsA} x {colsA})
          </h3>
          <table className="table-auto border-collapse border border-black mx-auto">
            <tbody>
              {matrixA.map((row, r) => (
                <tr key={r}>
                  {row.map((value, c) => (
                    <td key={c} className="border border-black-400 p-1">
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
          <div className="flex gap-2 mt-2 justify-center">
            <button
              className="text-sm bg-black text-white px-3 py-1 rounded hover:underline hover:cursor-pointer"
              onClick={() => fillZeros("A")}
            >
              Fill Empty with 0
            </button>
            <button
              className="text-sm bg-black text-white px-3 py-1 rounded hover:underline hover:cursor-pointer"
              onClick={() => clearMatrix("A")}
            >
              Clear Vector
            </button>
          </div>
        </div>

        {/* Matrix B */}
        <div>
          <h3 className="font-semibold mb-2 text-center">
            Matrix B ({rowsB} x {colsB})
          </h3>
          <table className="table-auto border-collapse border border-black mx-auto">
            <tbody>
              {matrixB.map((row, r) => (
                <tr key={r}>
                  {row.map((value, c) => (
                    <td key={c} className="border border-black-400 p-1">
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
          <div className="flex gap-2 mt-2 justify-center">
            <button
              className="text-sm bg-black text-white px-3 py-1 rounded hover:underline hover:cursor-pointer"
              onClick={() => fillZeros("B")}
            >
              Fill Empty with 0
            </button>
            <button
              className="text-sm bg-black text-white px-3 py-1 rounded hover:underline hover:cursor-pointer"
              onClick={() => clearMatrix("B")}
            >
              Clear Vector
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      {/* Result */}
      {result !== null && !error && (
        <p className="text-center font-semibold text-lg">
          Dot Product Result: <span className="text-black">{result}</span>
        </p>
      )}
    </div>
  );
};

export default DotProduct;
