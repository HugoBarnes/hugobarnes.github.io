import Board from "@/app/components/ScrabbleSolver/Board";
import ProjectShell from "@/app/components/ProjectShell";

export default function ScrabbleSolverPage() {
  return (
    <ProjectShell
      title="scrabble-solver"
      description="Enter the current board and your rack, then find the highest-scoring legal play. The solver accounts for existing tiles, cross-words, premium squares, blanks, and the 50-point bingo bonus."
    >
      <div className="mb-6 text-sm text-[#262e3e] space-y-2">
        <p>
          <span className="text-[#8e99ac]">1.</span> Type letters directly into
          the board to recreate your game.
        </p>
        <p>
          <span className="text-[#8e99ac]">2.</span> Fill your rack ( use{" "}
          <span className="text-[#5b6577]">?</span> for blanks ) and press{" "}
          <span className="text-[#2c4a86]">Find best plays</span>.
        </p>
        <p>
          <span className="text-[#8e99ac]">3.</span> Hover a result to preview it;
          press <span className="text-[#1a3e8c]">place</span> to commit it to the
          board.
        </p>
      </div>

      <Board />

      <div className="mt-10 border-t border-[#e4e9f2] pt-4 text-xs text-[#5b6577] space-y-1">
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
