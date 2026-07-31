import Board from "@/app/components/ScrabbleSolver/Board";
import ProjectShell from "@/app/components/ProjectShell";

export default function ScrabbleSolverPage() {
  return (
    <ProjectShell
      title="scrabble-solver"
      description="Enter the current board and your rack, then find the highest-scoring legal play. The solver accounts for existing tiles, cross-words, premium squares, blanks, and the 50-point bingo bonus."
    >
      <div className="mb-6 text-sm text-[color:var(--ss-text-soft)] space-y-2">
        <p>
          <span className="text-[color:var(--ss-muted)]">1.</span> Type letters directly into
          the board to recreate your game.
        </p>
        <p>
          <span className="text-[color:var(--ss-muted)]">2.</span> Fill your rack ( use{" "}
          <span className="text-[color:var(--ss-gray)]">?</span> for blanks ) and press{" "}
          <span className="text-[color:var(--ss-text-soft)]">Find best plays</span>.
        </p>
        <p>
          <span className="text-[color:var(--ss-muted)]">3.</span> Hover a result to preview it;
          press <span className="text-[color:var(--ss-accent)]">place</span> to commit it to the
          board.
        </p>
      </div>

      <Board />

      <div className="mt-10 border-t border-[color:var(--ss-rule)] pt-4 text-xs text-[color:var(--ss-gray)] space-y-1">
        <p>Useful resources:</p>
        <ul className="space-y-1 pl-4">
          <li>
            <a
              href="https://people.csail.mit.edu/jasonkb/quackle/doc/how_quackle_plays_scrabble.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              — How Quackle Plays Scrabble
            </a>
          </li>
          <li>
            <a
              href="https://ericsink.com/downloads/faster-scrabble-gordon.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              — A Faster Scrabble Move Generation Algorithm (Gordon)
            </a>
          </li>
        </ul>
      </div>
    </ProjectShell>
  );
}
