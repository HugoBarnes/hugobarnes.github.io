// Core Scrabble board constants: dimensions, letter values, and the premium
// square layout. The premium layout is symmetric under transpose, which the
// solver relies on to generate vertical plays by transposing the board.

export const BOARD_SIZE = 15;
export const RACK_SIZE = 7;
export const BLANK = "?";

export type Premium = "TW" | "DW" | "TL" | "DL" | "";

export const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1,
  J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10,
  R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};

export function letterValue(letter: string, blank: boolean): number {
  return blank ? 0 : LETTER_VALUES[letter] ?? 0;
}

const TRIPLE_WORD: [number, number][] = [
  [0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14],
];
const DOUBLE_WORD: [number, number][] = [
  [1, 1], [2, 2], [3, 3], [4, 4], [7, 7], [10, 10], [11, 11], [12, 12], [13, 13],
  [1, 13], [2, 12], [3, 11], [4, 10], [10, 4], [11, 3], [12, 2], [13, 1],
];
const TRIPLE_LETTER: [number, number][] = [
  [1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13],
  [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9],
];
const DOUBLE_LETTER: [number, number][] = [
  [0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14],
  [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11],
  [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14],
  [12, 6], [12, 8], [14, 3], [14, 11],
];

function buildPremiumGrid(): Premium[][] {
  const grid: Premium[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array<Premium>(BOARD_SIZE).fill("")
  );
  for (const [r, c] of TRIPLE_WORD) grid[r][c] = "TW";
  for (const [r, c] of DOUBLE_WORD) grid[r][c] = "DW";
  for (const [r, c] of TRIPLE_LETTER) grid[r][c] = "TL";
  for (const [r, c] of DOUBLE_LETTER) grid[r][c] = "DL";
  return grid;
}

export const PREMIUM_GRID = buildPremiumGrid();

export function premiumAt(row: number, col: number): Premium {
  return PREMIUM_GRID[row]?.[col] ?? "";
}

export function letterMultiplier(p: Premium): number {
  if (p === "DL") return 2;
  if (p === "TL") return 3;
  return 1;
}

export function wordMultiplier(p: Premium): number {
  if (p === "DW") return 2;
  if (p === "TW") return 3;
  return 1;
}

export const CENTER = Math.floor(BOARD_SIZE / 2); // 7

export function emptyBoard(): string[][] {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array<string>(BOARD_SIZE).fill("")
  );
}
