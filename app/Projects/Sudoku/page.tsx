"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@/app/components/Grid";
import ProjectShell from "@/app/components/ProjectShell";
import {
  Board,
  Difficulty,
  Game,
  cloneBoard,
  emptyBoard,
  findConflicts,
  generateGame,
  isComplete,
} from "@/app/lib/sudoku";

const BTN =
  "px-3 py-1.5 rounded text-sm bg-[#efefef] text-[#404040] hover:bg-[#e0e0e0] transition-colors cursor-pointer";

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SudokuPage() {
  const [game, setGame] = useState<Game | null>(null);
  const [board, setBoard] = useState<Board>(emptyBoard());
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [gaveUp, setGaveUp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const conflicts = useMemo(() => findConflicts(board), [board]);
  const solved =
    game !== null && isComplete(board) && conflicts.size === 0 && !gaveUp;

  const startNew = (diff: Difficulty) => {
    const next = generateGame(diff);
    setGame(next);
    setBoard(cloneBoard(next.puzzle));
    setWrong(new Set());
    setMessage("");
    setSeconds(0);
    setGaveUp(false);
  };

  useEffect(() => {
    startNew("medium");
  }, []);

  // Tick while the puzzle is unsolved.
  useEffect(() => {
    if (game === null || solved || gaveUp) return;
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [game, solved, gaveUp]);

  const givens = useMemo(
    () =>
      game
        ? game.puzzle.map((row) => row.map((v) => v !== ""))
        : emptyBoard().map((row) => row.map(() => false)),
    [game]
  );

  const handleInput = (row: number, col: number, value: string) => {
    setBoard((prev) => {
      const next = cloneBoard(prev);
      next[row][col] = value;
      return next;
    });
    setWrong(new Set());
    setMessage("");
  };

  const handleCheck = () => {
    if (!game) return;
    const bad = new Set<string>();
    let empty = 0;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === "") empty++;
        else if (board[r][c] !== game.solution[r][c]) bad.add(`${r}-${c}`);
      }
    }
    setWrong(bad);
    if (bad.size > 0) {
      setMessage(`${bad.size} cell${bad.size === 1 ? "" : "s"} incorrect`);
    } else if (empty > 0) {
      setMessage(`All correct so far — ${empty} to go`);
    } else {
      setMessage("Solved!");
    }
  };

  const handleHint = () => {
    if (!game) return;
    const candidates: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== game.solution[r][c]) candidates.push([r, c]);
      }
    }
    if (candidates.length === 0) return;
    const [r, c] = candidates[Math.floor(Math.random() * candidates.length)];
    setBoard((prev) => {
      const next = cloneBoard(prev);
      next[r][c] = game.solution[r][c];
      return next;
    });
    setWrong(new Set());
    setMessage("");
  };

  const handleSolve = () => {
    if (!game) return;
    setBoard(cloneBoard(game.solution));
    setWrong(new Set());
    setGaveUp(true);
    setMessage("Solution revealed");
  };

  const handleReset = () => {
    if (!game) return;
    setBoard(cloneBoard(game.puzzle));
    setWrong(new Set());
    setMessage("");
    setGaveUp(false);
  };

  return (
    <ProjectShell
      title="sudoku"
      description="A uniquely-solvable puzzle generated in your browser. Solve it yourself, get a hint when stuck, or have the whole thing solved for you."
    >
      <div className="flex flex-wrap items-start justify-center gap-8 text-left">
        <div>
          <Grid
            board={board}
            givens={givens}
            conflicts={conflicts}
            wrong={wrong}
            onInput={handleInput}
          />
          {solved && (
            <p className="mt-4 text-center text-lg text-[#ff6719] font-semibold">
              Solved in {formatTime(seconds)} — nice!
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 min-w-44">
          <div className="flex items-center justify-between text-sm text-[#6b6b6b]">
            <span className="capitalize">{difficulty}</span>
            <span className="tabular-nums">{formatTime(seconds)}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-[#a0a0a0]">
              New puzzle
            </span>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  className={`${BTN} capitalize ${
                    d === difficulty ? "bg-[#e0e0e0] font-semibold" : ""
                  }`}
                  onClick={() => {
                    setDifficulty(d);
                    startNew(d);
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-[#a0a0a0]">
              Play
            </span>
            <div className="flex flex-wrap gap-2">
              <button className={BTN} onClick={handleCheck}>
                Check
              </button>
              <button className={BTN} onClick={handleHint}>
                Hint
              </button>
              <button className={BTN} onClick={handleReset}>
                Reset
              </button>
              <button className={BTN} onClick={handleSolve}>
                Solve
              </button>
            </div>
          </div>

          {message && <p className="text-sm text-[#404040]">{message}</p>}
          {conflicts.size > 0 && (
            <p className="text-sm text-[#c0392b]">
              Conflicting cells are highlighted
            </p>
          )}
        </div>
      </div>
    </ProjectShell>
  );
}
