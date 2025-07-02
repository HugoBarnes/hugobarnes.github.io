import Image from "next/image";
import Board from "@/app/components/ScrabbleSolver/Board";

export default function Home() {
  return (
    <div  className="text-sm p-2">
        <p className="text-xl bold flex justify-content justify-center">
            Rules
        </p>
        <ul className="">
            <li> Type to update the board and rack to your current scenario.</li>
        </ul>
        <p className="text-xl bold flex justify-content justify-center"> Useful resources:</p>
        <ul>
            <li><a href="https://people.csail.mit.edu/jasonkb/quackle/doc/how_quackle_plays_scrabble.html" target="_blank" className="text-blue-500 underline hover:text-blue-700">How Quackle Plays Scrabble</a></li>
            <li><a href="https://ericsink.com/downloads/faster-scrabble-gordon.pdf" target="_blank" className="text-blue-500 underline hover:text-blue-700">A Faster Scrabble Move Generation Algorithm</a></li>
        </ul>
        <Board></Board>

    </div>
  );
}