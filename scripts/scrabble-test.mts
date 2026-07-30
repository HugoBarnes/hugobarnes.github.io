// Independent verification of the Scrabble solver.
// For each move the solver returns, we rebuild the board, extract every word
// formed (main + crosses), confirm each is a dictionary word, and recompute the
// score from first principles — then check it matches the solver's score.

import { readFileSync } from "node:fs";
import { createDictionary } from "../app/lib/scrabble/dictionary.ts";
import { findMoves, type Move } from "../app/lib/scrabble/solver.ts";
import {
  BOARD_SIZE,
  CENTER,
  emptyBoard,
  letterValue,
  letterMultiplier,
  premiumAt,
  wordMultiplier,
} from "../app/lib/scrabble/board.ts";

const raw = readFileSync(
  new URL("../public/scrabble/dictionary.txt", import.meta.url),
  "utf8"
);
const dict = createDictionary(raw.split(/\r?\n/));
console.log(`Dictionary loaded: ${dict.size} words`);

let failures = 0;
const assert = (cond: boolean, msg: string) => {
  if (!cond) {
    failures++;
    console.error("  ✗ FAIL:", msg);
  }
};

// Rebuild the final board (existing tiles + a move's placements), tracking which
// cells are blanks so scoring is independent of the solver.
function applyMove(board: string[][], m: Move) {
  const grid = board.map((r) => r.slice());
  const blanks = new Set<string>();
  for (const p of m.placements) {
    grid[p.row][p.col] = p.letter;
    if (p.blank) blanks.add(`${p.row},${p.col}`);
  }
  return { grid, blanks };
}

function wordAt(grid: string[][], r: number, c: number, dir: "H" | "V") {
  const dr = dir === "V" ? 1 : 0;
  const dc = dir === "H" ? 1 : 0;
  let sr = r;
  let sc = c;
  while (sr - dr >= 0 && sc - dc >= 0 && grid[sr - dr][sc - dc] !== "") {
    sr -= dr;
    sc -= dc;
  }
  const cells: [number, number][] = [];
  let cr = sr;
  let cc = sc;
  while (cr < BOARD_SIZE && cc < BOARD_SIZE && grid[cr][cc] !== "") {
    cells.push([cr, cc]);
    cr += dr;
    cc += dc;
  }
  return cells;
}

function independentScore(
  board: string[][],
  m: Move,
  grid: string[][],
  blanks: Set<string>
): number {
  const placedSet = new Set(m.placements.map((p) => `${p.row},${p.col}`));
  const isBlank = (r: number, c: number) => blanks.has(`${r},${c}`);

  const scoreWord = (cells: [number, number][]): number => {
    let sum = 0;
    let wm = 1;
    for (const [r, c] of cells) {
      const letter = grid[r][c];
      const base = letterValue(letter, isBlank(r, c));
      if (placedSet.has(`${r},${c}`)) {
        const prem = premiumAt(r, c);
        sum += base * letterMultiplier(prem);
        wm *= wordMultiplier(prem);
      } else {
        sum += base;
      }
    }
    return sum * wm;
  };

  let total = scoreWord(wordAt(grid, m.row, m.col, m.dir));
  const crossDir = m.dir === "H" ? "V" : "H";
  for (const p of m.placements) {
    const cells = wordAt(grid, p.row, p.col, crossDir);
    if (cells.length >= 2) total += scoreWord(cells);
  }
  if (m.placements.length === 7) total += 50;
  return total;
}

function verify(label: string, board: string[][], rack: string[]) {
  const moves = findMoves(board, rack, dict, 50);
  console.log(`\n[${label}] rack=${rack.join("")} -> ${moves.length} moves`);
  if (moves[0]) {
    console.log(
      `  best: ${moves[0].word} @(${moves[0].row},${moves[0].col}) ${moves[0].dir} = ${moves[0].score}`
    );
  }
  for (const m of moves) {
    const { grid, blanks } = applyMove(board, m);
    // Every word formed must be valid.
    const main = wordAt(grid, m.row, m.col, m.dir).map(([r, c]) => grid[r][c]).join("");
    assert(dict.isWord(main), `main word "${main}" not in dictionary`);
    const crossDir = m.dir === "H" ? "V" : "H";
    for (const p of m.placements) {
      const cells = wordAt(grid, p.row, p.col, crossDir);
      if (cells.length >= 2) {
        const w = cells.map(([r, c]) => grid[r][c]).join("");
        assert(dict.isWord(w), `cross word "${w}" not in dictionary`);
      }
    }
    // Score must match an independent recomputation.
    const expected = independentScore(board, m, grid, blanks);
    assert(
      expected === m.score,
      `score mismatch for ${m.word}: solver=${m.score} independent=${expected}`
    );
  }
  // Sorted best-first.
  for (let i = 1; i < moves.length; i++) {
    assert(moves[i - 1].score >= moves[i].score, "moves not sorted by score");
  }
  return moves;
}

// 1) First move on empty board.
const t1 = verify("empty/CAT", emptyBoard(), ["C", "A", "T"]);
assert(t1.length > 0, "expected moves for CAT on empty board");
assert(t1[0].score === 10, `expected best CAT score 10, got ${t1[0]?.score}`);
assert(
  t1[0].placements.some((p) => p.row === CENTER && p.col === CENTER),
  "first move must cover centre"
);

// 2) Extend existing CAT with S -> CATS.
const b2 = emptyBoard();
b2[7][6] = "C";
b2[7][7] = "A";
b2[7][8] = "T";
const t2 = verify("CAT+S", b2, ["S"]);
assert(
  t2.some((m) => m.word === "CATS"),
  "expected CATS among moves"
);

// 3) Seven-tile rack should be able to produce a bingo (+50) somewhere.
const t3 = verify("empty/RETINAS", emptyBoard(), [
  "R", "E", "T", "I", "N", "A", "S",
]);
assert(
  t3.some((m) => m.placements.length === 7 && m.score > 50),
  "expected a 7-tile bingo with +50 bonus"
);

// 4) Blank tile should be usable.
const t4 = verify("empty/blank", emptyBoard(), ["C", "A", "?"]);
assert(t4.length > 0, "expected moves using a blank");
assert(
  t4.every((m) => m.placements.every((p) => !p.blank || letterValue(p.letter, true) === 0)),
  "blank tiles must score 0"
);

// 5) Cross-word constraint: a move forming an invalid cross word must not appear
//    (covered by the per-move validation above across all scenarios).

console.log(
  failures === 0
    ? "\n✅ All Scrabble solver checks passed."
    : `\n❌ ${failures} check(s) failed.`
);
process.exit(failures === 0 ? 0 : 1);
