"use client";

import React, { useEffect, useState } from "react";
import { parseNumber, formatNumber } from "@/app/lib/linalg/number";
import { determinant } from "@/app/lib/linalg/matrix";
import MatrixInput from "./MatrixInput";
import { PRIMARY_BTN, ERROR_TEXT, emptyStringMatrix } from "./styles";

interface Props {
  size: number;
}

const Determinant: React.FC<Props> = ({ size }) => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setResult(null);
    setMatrix(emptyStringMatrix(size, size));
  }, [size]);

  const setCell = (r: number, c: number, value: string) =>
    setMatrix((m) =>
      m.map((row, i) => row.map((v, j) => (i === r && j === c ? value : v)))
    );

  const fill = () =>
    setMatrix((m) => m.map((row) => row.map((v) => (v.trim() === "" ? "0" : v))));
  const clear = () => setMatrix(emptyStringMatrix(size, size));

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
    setResult(determinant(parsed));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button className={PRIMARY_BTN} onClick={compute} disabled={size === 0}>
          Compute det(A)
        </button>
      </div>

      <div className="flex justify-center">
        <MatrixInput
          label={`Matrix A  (${size} × ${size})`}
          matrix={matrix}
          onChange={setCell}
          onFill={fill}
          onClear={clear}
        />
      </div>

      {error && <p className={ERROR_TEXT}>{error}</p>}
      {result !== null && !error && (
        <p className="text-center text-lg text-[#404040]">
          det(A) ={" "}
          <span className="text-[#4a4a4a] font-bold">{formatNumber(result)}</span>
        </p>
      )}
    </div>
  );
};

export default Determinant;
