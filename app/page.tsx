import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <img
        src="/images/Hugo.jpg"
        alt="Hugo"
        className="float-left mr-2 mb-2 w-1/6 p-2"
      />

      <div className="text-sm p-2">
        <p className="mb-4">
          I study Mathematics — with a focus on Probability and Statistics — and
          Computer Science at the University of Virginia in Charlottesville.
          I am building this site to record my progress
          as I learn Next.js and web development.
        </p>

        <p className="mb-4">
          Before UVA, I played for the academy teams of D.C. United and Bethesda
          Soccer Club and earned a Division I offer from Davidson. I now train
          with the UVA women’s varsity soccer team as a practice player.
        </p>

        <p className="mb-4">
          I am reading <em>Pachinko</em> by Min Jin Lee. My current academical interests
          include computer vision, reinforcement learning, and my mathematics
          courses. I am building a computer-vision model to analyze soccer
          matches—see the&nbsp;
          <Link href="/Thesis" className="hover:underline decoration-2">
            Thesis
          </Link>
          &nbsp;page for details—and a reinforcement-learning agent to beat
          Scrabble.
        </p>

        <p className="mb-4">
          Links to my <strong>LinkedIn</strong>, <strong>GitHub</strong>, and
          <strong> CV </strong> are in the footer.
        </p>

        <p className="mb-4 font-bold underline">Summer 2025 – Paris</p>

        <p className="mb-4">
          This summer I moved to Paris to cement the French I have studied
          for the last six years. I work at La Rotonde de La Muette and was recently
          promoted to bartender at its sister restaurant, Dino. Photos of both
          venues are below.
        </p>

        <div className="flex space-x-4 mb-4">
          <Image
            src="/images/Rotonde.jpg"
            alt="La Rotonde de La Muette"
            width={400}
            height={300}
          />
          <Image
            src="/images/Dino.jpeg"
            alt="Dino"
            width={400}
            height={300}
          />
        </div>

        <p className="mb-4">
          In my free time I continue my thesis research—updates appear in the
          header. I am also working through NeetCode’s 150 interview problems in
          Python and teaching myself SQL. When time permits, I add features to
          the projects on the Projects page.
        </p>
      </div>
    </div>
  );
}
