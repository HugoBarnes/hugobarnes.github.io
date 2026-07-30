"use client";

import React, { useEffect, useState } from "react";
import { parseNumber } from "@/app/lib/linalg/number";
import { transpose } from "@/app/lib/linalg/matrix";
import MatrixInput from "./MatrixInput";
import ResultMatrix from "./ResultMatrix";
import { PRIMARY_BTN, ERROR_TEXT, emptyStringMatrix } from "./styles";

interface Props {
  rows: number;
  cols: number;
}

const Transpose: React.FC<Props> = ({ rows, cols }) => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [result, setResult] = useState<number[][] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setResult(null);
    setMatrix(emptyStringMatrix(rows, cols));
  }, [rows, cols]);

  const setCell = (r: number, c: number, value: string) =>
    setMatrix((m) =>
      m.map((row, i) => row.map((v, j) => (i === r && j === c ? value : v)))
    );

  const fill = () =>
    setMatrix((m) => m.map((row) => row.map((v) => (v.trim() === "" ? "0" : v))));
  const clear = () => setMatrix(emptyStringMatrix(rows, cols));

  const compute = () => {
    let invalid = false;
    const parsed = matrix.map((row) =>
      row.map((v) => {
        const n = parseNumber(v);
        if (isNaN(n)) invalid = true;
        return isNaN(n) ? 0 : n;
      })
    );
    if (invalid) {
      setError("Every entry must be a number or fraction.");
      setResult(null);
      return;
    }
    setError("");
    setResult(transpose(parsed));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button className={PRIMARY_BTN} onClick={compute} disabled={rows === 0 || cols === 0}>
          Compute Aᵀ
        </button>
      </div>

      <div className="flex justify-center">
        <MatrixInput
          label="Matrix A"
          matrix={matrix}
          onChange={setCell}
          onFill={fill}
          onClear={clear}
        />
      </div>

      {error && <p className={ERROR_TEXT}>{error}</p>}
      {result && (
        <div className="flex justify-center pt-2">
          <ResultMatrix label="Aᵀ" matrix={result} />
        </div>
      )}
    </div>
  );
};

export default Transpose;
