"use client";

import React, { useCallback, useMemo, useState } from "react";
import { BOARD_SIZE, RACK_SIZE, emptyBoard } from "@/app/lib/scrabble/board";
import { loadDictionary } from "@/app/lib/scrabble/dictionary";
import { findMoves, type Move } from "@/app/lib/scrabble/solver";
import BoardGrid, { type PreviewTile } from "./BoardGrid";
import Rack from "./Rack";
import Results from "./Results";

type DictState = "idle" | "loading" | "ready" | "error";

const Board = () => {
  const [board, setBoard] = useState<string[][]>(emptyBoard);
  const [rack, setRack] = useState<string[]>(Array(RACK_SIZE).fill(""));
  const [moves, setMoves] = useState<Move[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [dictState, setDictState] = useState<DictState>("idle");
  const [solving, setSolving] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleCellChange = useCallback((row: number, col: number, val: string) => {
    setBoard((prev) =>
      prev.map((r, i) => r.map((c, j) => (i === row && j === col ? val : c)))
    );
    setMoves([]);
    setSelected(null);
  }, []);

  const handleRackChange = useCallback((index: number, val: string) => {
    setRack((prev) => prev.map((t, i) => (i === index ? val : t)));
    setMoves([]);
    setSelected(null);
  }, []);

  const solve = useCallback(async () => {
    const rackTiles = rack.filter((t) => t !== "");
    if (rackTiles.length === 0) {
      setMessage("Add some tiles to your rack first.");
      setMoves([]);
      return;
    }
    setMessage("");
    setSolving(true);
    setSelected(null);
    try {
      setDictState((s) => (s === "ready" ? s : "loading"));
      const dict = await loadDictionary();
      setDictState("ready");
      // Defer to next frame so the "solving" state can paint on large boards.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      const best = findMoves(board, rackTiles, dict, 15);
      setMoves(best);
      if (best.length === 0) {
        setMessage("No legal plays found for this rack and board.");
      }
    } catch {
      setDictState("error");
      setMessage("Could not load the dictionary. Please try again.");
    } finally {
      setSolving(false);
    }
  }, [board, rack]);

  const applyMove = useCallback((move: Move) => {
    setBoard((prev) => {
      const next = prev.map((r) => r.slice());
      for (const p of move.placements) next[p.row][p.col] = p.letter;
      return next;
    });
    // Remove the used tiles from the rack.
    setRack((prev) => {
      const next = [...prev];
      for (const p of move.placements) {
        const wanted = p.blank ? "?" : p.letter;
        const idx = next.findIndex((t) => t === wanted);
        if (idx !== -1) next[idx] = "";
      }
      return next;
    });
    setMoves([]);
    setSelected(null);
    setMessage("");
  }, []);

  const clearBoard = useCallback(() => {
    setBoard(emptyBoard());
    setMoves([]);
    setSelected(null);
  }, []);

  const clearRack = useCallback(() => {
    setRack(Array(RACK_SIZE).fill(""));
    setMoves([]);
    setSelected(null);
  }, []);

  const preview = useMemo(() => {
    const map = new Map<string, PreviewTile>();
    if (selected !== null && moves[selected]) {
      for (const p of moves[selected].placements) {
        map.set(`${p.row},${p.col}`, { letter: p.letter, blank: p.blank });
      }
    }
    return map;
  }, [selected, moves]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
        {/* Board */}
        <div className="space-y-4">
          <BoardGrid board={board} preview={preview} onChange={handleCellChange} />
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-[#5b6577]">
            <Legend className="bg-[#16294f]" label="triple word" />
            <Legend className="bg-[#263a64]" label="double word" />
            <Legend className="bg-[#122a5e]" label="triple letter" />
            <Legend className="bg-[#2a4478]" label="double letter" />
          </div>
        </div>

        {/* Controls + results */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm text-[#1a3e8c] mb-2">
              <span className="text-[#8e99ac]">$</span> your rack
            </h3>
            <Rack tiles={rack} onChange={handleRackChange} />
            <p className="mt-2 text-[10px] text-[#8e99ac] text-center">
              Type letters; use <span className="text-[#5b6577]">?</span> for a blank.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={solve}
              disabled={solving}
              className="px-4 py-2 rounded text-sm font-medium bg-[#2c4a86] text-[#ffffff]
                hover:bg-[#223a69] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {solving
                ? dictState === "loading"
                  ? "Loading dictionary…"
                  : "Solving…"
                : "Find best plays"}
            </button>
            <button
              onClick={clearRack}
              className="px-3 py-2 rounded text-sm bg-[#e4e9f2] text-[#262e3e] hover:bg-[#cfd7e4] transition-colors"
            >
              Clear rack
            </button>
            <button
              onClick={clearBoard}
              className="px-3 py-2 rounded text-sm bg-[#e4e9f2] text-[#262e3e] hover:bg-[#cfd7e4] transition-colors"
            >
              Clear board
            </button>
          </div>

          {message && <p className="text-sm text-[#1b4f9e]">{message}</p>}

          <Results
            moves={moves}
            selected={selected}
            onSelect={setSelected}
            onApply={applyMove}
          />
        </div>
      </div>
    </div>
  );
};

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`inline-block w-3 h-3 rounded-sm ${className}`} />
      {label}
    </span>
  );
}

export default Board;
