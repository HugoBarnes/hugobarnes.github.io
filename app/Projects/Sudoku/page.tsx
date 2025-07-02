"use client"

import { useState, useEffect } from "react";
import Grid from "@/app/components/Grid";

export default function SudokuGrid() {
  const [board, setBoard] = useState(
    Array(9).fill(null).map(() => Array(9).fill(""))
  );
  const [isBoardValid, setIsBoardValid] = useState<boolean | null>(null);

  useEffect(() => {
    const puzzle = generatePuzzle();
    setBoard(puzzle);
  }, []);

  const handleCheckBoard = () => {
    const valid = checkBoard(board);
    setIsBoardValid(valid);
  };

  const checkBoard = (grid: string[][]): boolean => {
    for (let i = 0; i < 9; i++) {
      if (!checkRow(i, grid)) return false;
      if (!checkCol(i, grid)) return false;
      if (!checkSquare(i, grid)) return false;
    }
    return true;
  };

  function generatePuzzle(): string[][] {
    const grid = Array.from({ length: 9 }, () => Array(9).fill(""));

    const fillGrid = (row = 0, col = 0): boolean => {
      if (row === 9) return true;
      const nextRow = col === 8 ? row + 1 : row;
      const nextCol = (col + 1) % 9;
      const nums = shuffle(Array.from({ length: 9 }, (_, i) => String(i + 1)));

      for (const val of nums) {
        if (isPlacementValid(grid, row, col, val)) {
          grid[row][col] = val;
          if (fillGrid(nextRow, nextCol)) return true;
          grid[row][col] = "";
        }
      }
      return false;
    };

    fillGrid();

    const puzzle = grid.map(row => [...row]);
    const positions = shuffleCoords();

    for (const [r, c] of positions) {
      const backup = puzzle[r][c];
      puzzle[r][c] = "";

      let solutionCount = 0;

      const countSolutions = (grid: string[][]): void => {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            if (grid[row][col] === "") {
              for (let d = 1; d <= 9; d++) {
                const val = String(d);
                if (isPlacementValid(grid, row, col, val)) {
                  grid[row][col] = val;
                  countSolutions(grid);
                  grid[row][col] = "";
                }
              }
              return;
            }
          }
        }
        solutionCount++;
      };

      countSolutions(puzzle.map(row => [...row]));
      if (solutionCount !== 1) {
        puzzle[r][c] = backup;
      }
    }

    return puzzle;
  }

  const clearBoard = (grid: string[][]) => {
    const temp = Array(9).fill(null).map(() => Array(9).fill(""));
    setIsBoardValid(null);
    setBoard(temp);
  };

  return (
    <div className="p-2 flex items-start gap-4">
      <Grid board={board} setBoard={setBoard} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 bg-black text-white hover:cursor-pointer hover:underline rounded-none"
            onClick={handleCheckBoard}
          >
            Check
          </button>
          {isBoardValid === true && <div className="w-4 h-4 bg-green-500" />}
          {isBoardValid === false && <div className="w-4 h-4 bg-red-500" />}
        </div>

        <button
          className="px-2 py-1 bg-black text-white hover:cursor-pointer hover:underline rounded-none"
          onClick={() => {
            setIsBoardValid(null);
            setBoard(generatePuzzle());
          }}
        >
          New Board
        </button>
        <button
          className="px-2 py-1 bg-black text-white hover:cursor-pointer hover:underline rounded-none"
          onClick={() => clearBoard(board)}
        >
          Clear Board
        </button>
      </div>
    </div>
  );

  function checkRow(rowNum: number, board: string[][]): boolean {
    const seen = new Set<number>();
    for (let i = 0; i < 9; i++) {
      const num = board[rowNum][i];
      if (num !== "" && !isNaN(Number(num))) {
        const val = parseInt(num);
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
    return true;
  }

  function checkCol(colNum: number, board: string[][]): boolean {
    const seen = new Set<number>();
    for (let i = 0; i < 9; i++) {
      const num = board[i][colNum];
      if (num !== "" && !isNaN(Number(num))) {
        const val = parseInt(num);
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
    return true;
  }

  function checkSquare(i: number, board: string[][]): boolean {
    const seen = new Set<number>();
    const rowStart = Math.floor(i / 3) * 3;
    const colStart = (i % 3) * 3;

    for (let r = rowStart; r < rowStart + 3; r++) {
      for (let c = colStart; c < colStart + 3; c++) {
        const num = board[r][c];
        if (num !== "" && !isNaN(Number(num))) {
          const val = parseInt(num);
          if (seen.has(val)) return false;
          seen.add(val);
        }
      }
    }
    return true;
  }

  function isPlacementValid(grid: string[][], row: number, col: number, val: string): boolean {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === val || grid[i][col] === val) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (grid[r][c] === val) return false;
      }
    }
    return true;
  }

  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shuffleCoords(): [number, number][] {
    const coords: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        coords.push([r, c]);
      }
    }
    return shuffle(coords);
  }
}
