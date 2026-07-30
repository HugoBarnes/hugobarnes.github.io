// Sudoku generation and checking, shared by the Sudoku page.

export type Board = string[][];

export interface Game {
  puzzle: Board; // the givens ("" where empty)
  solution: Board; // the completed grid
}

export type Difficulty = "easy" | "medium" | "hard";

// How many cells we try to blank out per difficulty (out of 81).
const REMOVAL_TARGET: Record<Difficulty, number> = {
  easy: 36,
  medium: 46,
  hard: 81,
};

export const emptyBoard = (): Board =>
  Array.from({ length: 9 }, () => Array(9).fill(""));

export const cloneBoard = (b: Board): Board => b.map((row) => [...row]);

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function isPlacementValid(
  grid: Board,
  row: number,
  col: number,
  val: string
): boolean {
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

function fillGrid(grid: Board, row = 0, col = 0): boolean {
  if (row === 9) return true;
  const nextRow = col === 8 ? row + 1 : row;
  const nextCol = (col + 1) % 9;
  for (const val of shuffle(Array.from({ length: 9 }, (_, i) => String(i + 1)))) {
    if (isPlacementValid(grid, row, col, val)) {
      grid[row][col] = val;
      if (fillGrid(grid, nextRow, nextCol)) return true;
      grid[row][col] = "";
    }
  }
  return false;
}

// Counts solutions, giving up as soon as it finds a second one.
function countSolutions(grid: Board, counter = { n: 0 }): number {
  if (counter.n > 1) return counter.n;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === "") {
        for (let d = 1; d <= 9; d++) {
          const val = String(d);
          if (isPlacementValid(grid, row, col, val)) {
            grid[row][col] = val;
            countSolutions(grid, counter);
            grid[row][col] = "";
            if (counter.n > 1) return counter.n;
          }
        }
        return counter.n;
      }
    }
  }
  counter.n++;
  return counter.n;
}

export function generateGame(difficulty: Difficulty): Game {
  const solution = emptyBoard();
  fillGrid(solution);

  const puzzle = cloneBoard(solution);
  let removed = 0;
  const target = REMOVAL_TARGET[difficulty];

  for (const [r, c] of shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  )) {
    if (removed >= target) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = "";
    if (countSolutions(cloneBoard(puzzle)) !== 1) {
      puzzle[r][c] = backup;
    } else {
      removed++;
    }
  }

  return { puzzle, solution };
}

// Set of "r-c" keys for every filled cell that clashes with another
// filled cell in its row, column, or box.
export function findConflicts(board: Board): Set<string> {
  const conflicts = new Set<string>();
  const groups: [number, number][][] = [];

  for (let i = 0; i < 9; i++) {
    groups.push(Array.from({ length: 9 }, (_, j) => [i, j] as [number, number]));
    groups.push(Array.from({ length: 9 }, (_, j) => [j, i] as [number, number]));
    const rowStart = Math.floor(i / 3) * 3;
    const colStart = (i % 3) * 3;
    const box: [number, number][] = [];
    for (let r = rowStart; r < rowStart + 3; r++) {
      for (let c = colStart; c < colStart + 3; c++) box.push([r, c]);
    }
    groups.push(box);
  }

  for (const group of groups) {
    const byVal = new Map<string, [number, number][]>();
    for (const [r, c] of group) {
      const v = board[r][c];
      if (v === "") continue;
      byVal.set(v, [...(byVal.get(v) ?? []), [r, c]]);
    }
    for (const cells of byVal.values()) {
      if (cells.length > 1) {
        cells.forEach(([r, c]) => conflicts.add(`${r}-${c}`));
      }
    }
  }

  return conflicts;
}

export const isComplete = (board: Board): boolean =>
  board.every((row) => row.every((v) => v !== ""));
