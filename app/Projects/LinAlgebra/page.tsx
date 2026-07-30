"use client";

import { useState } from "react";
import ProjectShell from "@/app/components/ProjectShell";
import Computations from "@/app/components/LinAlgCalculator/Computations";
import Dimensions from "@/app/components/LinAlgCalculator/Dimensions";
import MatrixMultiplicationVisualizer from "@/app/components/LinAlgCalculator/MatrixMultiplicationVisualizer";
import DotProduct from "@/app/components/LinAlgCalculator/DotProduct";
import MatrixPower from "@/app/components/LinAlgCalculator/MatrixPower";
import Transpose from "@/app/components/LinAlgCalculator/Transpose";
import Determinant from "@/app/components/LinAlgCalculator/Determinant";

type Op =
  | "multiply"
  | "dotProduct"
  | "power"
  | "transpose"
  | "determinant";

const OPERATIONS: { id: Op; name: string }[] = [
  { id: "multiply", name: "Multiplication" },
  { id: "dotProduct", name: "Dot Product" },
  { id: "power", name: "Matrix Power" },
  { id: "transpose", name: "Transpose" },
  { id: "determinant", name: "Determinant" },
];

export default function MatrixPage() {
  const [op, setOp] = useState<Op>("multiply");
  const [matrixA, setMatrixA] = useState({ rows: 3, cols: 3 });
  const [matrixB, setMatrixB] = useState({ rows: 3, cols: 3 });
  const [power, setPower] = useState(2);

  const dimsForOp = () => {
    switch (op) {
      case "multiply":
        return (
          <div className="flex flex-wrap justify-center gap-8">
            <Dimensions
              label="Matrix A"
              rows={matrixA.rows}
              cols={matrixA.cols}
              onChange={(rows, cols) => setMatrixA({ rows, cols })}
            />
            <Dimensions
              label="Matrix B"
              rows={matrixB.rows}
              cols={matrixB.cols}
              onChange={(rows, cols) => setMatrixB({ rows, cols })}
            />
          </div>
        );
      case "dotProduct":
        return (
          <Dimensions
            label="Vector length"
            rows={matrixA.rows}
            cols={1}
            lockCols
            onChange={(rows) => setMatrixA({ rows, cols: 1 })}
          />
        );
      case "power":
        return (
          <div className="flex flex-wrap justify-center items-end gap-8">
            <Dimensions
              label="Square matrix"
              rows={matrixA.rows}
              cols={matrixA.cols}
              lockCols
              onChange={(rows) => setMatrixA({ rows, cols: rows })}
            />
            <label className="flex items-center gap-2 text-sm text-[#404040]">
              Power n
              <input
                type="number"
                min={0}
                value={power}
                onChange={(e) => setPower(parseInt(e.target.value) || 0)}
                className="w-16 h-9 px-2 text-center rounded bg-[#fafafa] text-[#1c1c1c]
                  border border-[#e0e0e0] outline-none focus:border-[#ff6719] transition-colors tabular-nums"
              />
            </label>
          </div>
        );
      case "transpose":
        return (
          <Dimensions
            label="Matrix A"
            rows={matrixA.rows}
            cols={matrixA.cols}
            onChange={(rows, cols) => setMatrixA({ rows, cols })}
          />
        );
      case "determinant":
        return (
          <Dimensions
            label="Square matrix"
            rows={matrixA.rows}
            cols={matrixA.cols}
            lockCols
            onChange={(rows) => setMatrixA({ rows, cols: rows })}
          />
        );
    }
  };

  const content = () => {
    switch (op) {
      case "multiply":
        return (
          <MatrixMultiplicationVisualizer
            rowsA={matrixA.rows}
            colsA={matrixA.cols}
            rowsB={matrixB.rows}
            colsB={matrixB.cols}
          />
        );
      case "dotProduct":
        return (
          <DotProduct rowsA={matrixA.rows} colsA={1} rowsB={matrixA.rows} colsB={1} />
        );
      case "power":
        return <MatrixPower rows={matrixA.rows} cols={matrixA.rows} power={power} />;
      case "transpose":
        return <Transpose rows={matrixA.rows} cols={matrixA.cols} />;
      case "determinant":
        return <Determinant size={matrixA.rows} />;
    }
  };

  return (
    <ProjectShell
      title="linear-algebra"
      description="A clean calculator for everyday matrix work — multiplication, dot products, powers, transpose, and determinants. Entries accept integers, decimals, or fractions like 3/4."
    >
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {OPERATIONS.map((o) => (
          <Computations
            key={o.id}
            comp={o.name}
            active={op === o.id}
            onClick={() => setOp(o.id)}
          />
        ))}
      </div>

      <div className="mb-8">{dimsForOp()}</div>

      <div>{content()}</div>
    </ProjectShell>
  );
}
