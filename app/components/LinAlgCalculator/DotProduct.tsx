"use client";

import React, { useEffect, useState } from "react";
import { parseNumber, formatNumber } from "@/app/lib/linalg/number";
import MatrixInput from "./MatrixInput";
import { PRIMARY_BTN, ERROR_TEXT, emptyStringMatrix } from "./styles";

interface Props {
  rowsA: number;
  colsA: number;
  rowsB: number;
  colsB: number;
}

const DotProduct: React.FC<Props> = ({ rowsA }) => {
  const [vecA, setVecA] = useState<string[][]>([]);
  const [vecB, setVecB] = useState<string[][]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setResult(null);
    setError("");
    setVecA(emptyStringMatrix(rowsA, 1));
    setVecB(emptyStringMatrix(rowsA, 1));
  }, [rowsA]);

  const setCell =
    (which: "A" | "B") => (r: number, _c: number, value: string) => {
      const update = (m: string[][]) =>
        m.map((row, i) => (i === r ? [value] : row));
      which === "A" ? setVecA(update) : setVecB(update);
    };

  const fill = (which: "A" | "B") => () => {
    const update = (m: string[][]) =>
      m.map((row) => [row[0].trim() === "" ? "0" : row[0]]);
    which === "A" ? setVecA(update) : setVecB(update);
  };

  const clear = (which: "A" | "B") => () =>
    which === "A" ? setVecA(emptyStringMatrix(rowsA, 1)) : setVecB(emptyStringMatrix(rowsA, 1));

  const compute = () => {
    let invalid = false;
    const parse = (m: string[][]) =>
      m.map((row) => {
        const n = parseNumber(row[0]);
        if (isNaN(n)) invalid = true;
        return isNaN(n) ? 0 : n;
      });
    const a = parse(vecA);
    const b = parse(vecB);
    if (invalid) {
      setError("Every entry must be a number or fraction.");
      setResult(null);
      return;
    }
    setError("");
    setResult(a.reduce((sum, v, i) => sum + v * b[i], 0));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button className={PRIMARY_BTN} onClick={compute} disabled={rowsA <= 0}>
          Compute a · b
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-8">
        <MatrixInput
          label="Vector a"
          matrix={vecA}
          onChange={setCell("A")}
          onFill={fill("A")}
          onClear={clear("A")}
        />
        <span className="self-center text-2xl text-[#8e99ac] pt-6">·</span>
        <MatrixInput
          label="Vector b"
          matrix={vecB}
          onChange={setCell("B")}
          onFill={fill("B")}
          onClear={clear("B")}
        />
      </div>

      {error && <p className={ERROR_TEXT}>{error}</p>}
      {result !== null && !error && (
        <p className="text-center text-lg text-[#262e3e]">
          a · b ={" "}
          <span className="text-[#2c4a86] font-bold">{formatNumber(result)}</span>
        </p>
      )}
    </div>
  );
};

export default DotProduct;
