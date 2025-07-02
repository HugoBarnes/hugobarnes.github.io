"use client";

import { useState, useEffect } from "react";
import Computations from "@/app/components/LinAlgCalculator/Computations";
import Dimensions from "@/app/components/LinAlgCalculator/Dimensions";
import MatrixMultiplicationVisualizer from "@/app/components/LinAlgCalculator/MatrixMultiplicationVisualizer";
import DotProduct from "@/app/components/LinAlgCalculator/DotProduct";
import MatrixPower from "@/app/components/LinAlgCalculator/MatrixPower";

const matrixOperations = [
  { name: "Matrix Multiplication", id: "matrixMultiplication" },
  { name: "Dot Product", id: "dotProduct" },
  { name: "Matrix Power", id: "matrixPower" },
  // {
  //   name: (
  //     <>
  //       M = (I - Q)
  //       <sup>-1</sup>
  //     </>
  //   ),
  //   id: "mMatrix",
  // },
  // {
  //   name: (
  //     <>
  //       A = (I - Q)
  //       <sup>-1</sup>(S)
  //     </>
  //   ),
  //   id: "absorbingMatrix",
  // },
  // { name: "Eigenvalues + Eigenvectors", id: "eigenComps" },
  // { name: "Generalized Eigenvectors", id: "genEigen" },
  // { name: "Null Space", id: "nullSpace" },
  // { name: "Column Space", id: "colSpace" },
  // { name: "Invert Matrix", id: "invertMatrix" },
];

export default function MatrixPage() {
  const [computation, setComputation] = useState("matrixMultiplication");

  const [matrixA, setMatrixA] = useState({ rows: 3, cols: 3 });
  const [matrixB, setMatrixB] = useState({ rows: 3, cols: 3 });

  const [power, setPower] = useState(2);

  useEffect(() => {
    if (computation === "dotProduct") {
      setMatrixA((prev) => ({ rows: prev.rows, cols: 1 }));
      setMatrixB((prev) => ({ rows: prev.rows, cols: 1 }));
    } else if (computation === "matrixPower") {
      setMatrixA((prev) => ({
        rows: prev.rows,
        cols: prev.rows, // force square
      }));
    }
  }, [computation]);

  const handleMatrixADimensions = (rows: number, cols: number) => {
    setMatrixA({ rows, cols });
  };

  const handleMatrixBDimensions = (rows: number, cols: number) => {
    setMatrixB({ rows, cols });
  };

  let computationContent = null;
  switch (computation) {
    case "matrixMultiplication":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Matrix Multiplication</h2>
          <MatrixMultiplicationVisualizer
            rowsA={matrixA.rows}
            colsA={matrixA.cols}
            rowsB={matrixB.rows}
            colsB={matrixB.cols}
          />
        </div>
      );
      break;
    case "dotProduct":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Dot Product</h2>
          <DotProduct
            rowsA={matrixA.rows}
            colsA={1}
            rowsB={matrixA.rows}
            colsB={1}
          />
        </div>
      );
      break;
    case "matrixPower":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Matrix Power</h2>
          <MatrixPower
            rows={matrixA.rows}
            cols={matrixA.cols}
            power={power}
          />
        </div>
      );
      break;
    case "mMatrix":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">
            M = (I - Q)<sup>-1</sup>
          </h2>
        </div>
      );
      break;
    case "absorbingMatrix":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">
            A = (I - Q)<sup>-1</sup>(S)
          </h2>
        </div>
      );
      break;
    case "eigenComps":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Eigenvalues + Eigenvectors</h2>
        </div>
      );
      break;
    case "genEigen":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Generalized Eigenvectors</h2>
        </div>
      );
      break;
    case "nullSpace":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Null Space</h2>
        </div>
      );
      break;
    case "colSpace":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Column Space</h2>
        </div>
      );
      break;
    case "invertMatrix":
      computationContent = (
        <div>
          <h2 className="text-lg font-bold p-2">Invert Matrix</h2>
        </div>
      );
      break;
    default:
      computationContent = null;
  }

  return (
  <div>
    <div className="flex flex-wrap p-2">
      {matrixOperations.map((item, index) => (
        <Computations
          key={index}
          comp={item.name}
          onClick={() => setComputation(item.id)}
        />
      ))}
    </div>

    <div className="flex flex-wrap p-2 justify-center">
      {computation === "matrixMultiplication" ? (
        <>
          <div className="m-2">
            <h3 className="text-md font-semibold">Matrix A Dimensions</h3>
            <Dimensions
              rows={matrixA.rows}
              cols={matrixA.cols}
              onChange={handleMatrixADimensions}
            />
          </div>
          <div className="m-2">
            <h3 className="text-md font-semibold">Matrix B Dimensions</h3>
            <Dimensions
              rows={matrixB.rows}
              cols={matrixB.cols}
              onChange={handleMatrixBDimensions}
            />
          </div>
        </>
      ) : computation === "matrixPower" ? (
        <div className="m-2">
          <h3 className="text-md font-semibold mb-2">Matrix Dimensions & Power</h3>
          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium mb-1">Rows</label>
              <input
                type="number"
                min={1}
                value={matrixA.rows}
                onChange={(e) =>
                  handleMatrixADimensions(parseInt(e.target.value), matrixA.cols)
                }
                className="border px-2 py-1 w-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Columns</label>
              <input
                type="number"
                min={1}
                value={matrixA.cols}
                onChange={(e) =>
                  handleMatrixADimensions(matrixA.rows, parseInt(e.target.value))
                }
                className="border px-2 py-1 w-20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Power</label>
              <input
                type="number"
                min={1}
                value={power}
                onChange={(e) => setPower(parseInt(e.target.value))}
                className="border px-5 py-1 w-20"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="m-2">
          <h3 className="text-md font-semibold">Matrix Dimensions</h3>
          <Dimensions
            rows={matrixA.rows}
            cols={matrixA.cols}
            onChange={handleMatrixADimensions}
          />
        </div>
      )}
    </div>

    <div className="p-4">{computationContent}</div>
  </div>
);
}
