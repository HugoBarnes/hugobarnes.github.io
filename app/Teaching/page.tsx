import Image from "next/image";

export default function Teaching() {
  return (
    <div className="text-sm p-2">
        <img src="/images/Teaching.jpg" alt="Teaching" className="mb-6"></img>
        <p className="mb-4">
          Above is a picture of me teaching UVA's Fall 2024 CS 2120's Discrete Mathematics I course.
          I was selected to fill in by fellow T.A.'s after <a href="https://www.elizabethorrico.com/home" target="_blank" className="text-blue-500 underline hover:text-blue-700">
          Professor Orrico</a> left UVA prematurely for personal reasons.
        </p>
        <div className="flex flex-col items-center justify-center mb-4">
        <a
          href="https://drive.google.com/file/d/1Hg4Fh8s8LziblSEHTzarVoWh0xnGjGwj/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
          >
          10:00 AM Lecture
        </a>
        <a
          href="https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
          >
          11:00 AM Lecture
        </a>
        </div>
        <p className="mb-6">
          In the Fall of 2024, I took Basic Real Analysis (MATH 3310) and Advanced
          Linear Algebra (MATH 4651).
          My LaTeX notes are provided below.
        </p>
        <div className="flex flex-col items-center justify-center">
        <a
          href="/pdfs/BasicRealAnalyis.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
          >
          Basic Real Analysis.pdf
        </a>
        <a
          href="/pdfs/AdvancedLinearAlgebra.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
          >
          Advanced Linear Algebra.pdf
        </a>

        </div>
    </div>
  );
}