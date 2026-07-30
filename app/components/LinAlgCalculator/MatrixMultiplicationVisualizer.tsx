"use client";

import React, { useEffect, useState } from "react";
import { parseNumber } from "@/app/lib/linalg/number";
import { multiply } from "@/app/lib/linalg/matrix";
import MatrixInput from "./MatrixInput";
import ResultMatrix from "./ResultMatrix";
import { PRIMARY_BTN, ERROR_TEXT, emptyStringMatrix } from "./styles";

interface Props {
  rowsA: number;
  colsA: number;
  rowsB: number;
  colsB: number;
}

const MatrixMultiplicationVisualizer: React.FC<Props> = ({
  rowsA,
  colsA,
  rowsB,
  colsB,
}) => {
  const [matrixA, setMatrixA] = useState<string[][]>([]);
  const [matrixB, setMatrixB] = useState<string[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setResult(null);
    setError(
      colsA !== rowsB
        ? `Columns of A (${colsA}) must equal rows of B (${rowsB}).`
        : ""
    );
    setMatrixA(emptyStringMatrix(rowsA, colsA));
    setMatrixB(emptyStringMatrix(rowsB, colsB));
  }, [rowsA, colsA, rowsB, colsB]);

  const setCell =
    (which: "A" | "B") => (r: number, c: number, value: string) => {
      const update = (m: string[][]) =>
        m.map((row, i) => row.map((v, j) => (i === r && j === c ? value : v)));
      which === "A" ? setMatrixA(update) : setMatrixB(update);
    };

  const fill = (which: "A" | "B") => () => {
    const update = (m: string[][]) =>
      m.map((row) => row.map((v) => (v.trim() === "" ? "0" : v)));
    which === "A" ? setMatrixA(update) : setMatrixB(update);
  };

  const clear = (which: "A" | "B") => () =>
    which === "A"
      ? setMatrixA(emptyStringMatrix(rowsA, colsA))
      : setMatrixB(emptyStringMatrix(rowsB, colsB));

  const compute = () => {
    if (colsA !== rowsB) {
      setError(`Columns of A (${colsA}) must equal rows of B (${rowsB}).`);
      setResult(null);
      return;
    }
    let invalid = false;
    const parse = (m: string[][]) =>
      m.map((row) =>
        row.map((v) => {
          const n = parseNumber(v);
          if (isNaN(n)) invalid = true;
          return isNaN(n) ? 0 : n;
        })
      );
    const a = parse(matrixA);
    const b = parse(matrixB);
    if (invalid) {
      setError("Every entry must be a number or fraction.");
      setResult(null);
      return;
    }
    setError("");
    setResult(multiply(a, b));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button className={PRIMARY_BTN} onClick={compute}>
          Multiply A × B
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-8">
        <MatrixInput
          label="Matrix A"
          matrix={matrixA}
          onChange={setCell("A")}
          onFill={fill("A")}
          onClear={clear("A")}
        />
        <span className="self-center text-2xl text-[#4a3a42] pt-6">×</span>
        <MatrixInput
          label="Matrix B"
          matrix={matrixB}
          onChange={setCell("B")}
          onFill={fill("B")}
          onClear={clear("B")}
        />
      </div>

      {error && <p className={ERROR_TEXT}>{error}</p>}
      {result && (
        <div className="flex justify-center pt-2">
          <ResultMatrix label="A × B" matrix={result} />
        </div>
      )}
    </div>
  );
};

export default MatrixMultiplicationVisualizer;
