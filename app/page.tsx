import BentoBox from "./components/BentoBox";
import ScrollDownArrow from "./components/ScrollDownArrow";

function SectionHeading({
  n,
  id,
  title,
}: {
  n: string;
  id: string;
  title: string;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-[#9aa5cc] text-2xl mb-6 border-b border-[#241a20] pb-2"
    >
      <span className="text-[#4a3a42]">[{n}]</span>{" "}
      <span className="text-[#b8bd8f]">#</span> {title}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero — full viewport */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center"
      >
        <img
          src="/images/Hugo.jpg"
          alt="Hugo"
          className="w-32 h-32 rounded-full object-cover border-2 border-[#3a2a30] mb-8"
        />
        <p className="text-[#e9eef8] text-sm mb-4">
          <span className="text-[#b8bd8f]">~$</span> whoami
        </p>
        <h1 className="text-5xl md:text-7xl text-[#e9eef8] tracking-tight">
          hugo-barnes
          <span className="inline-block w-[0.6ch] ml-1 bg-[#9aa5cc] animate-pulse h-[1em] align-[-0.15em]" />
        </h1>
        <p className="mt-6 text-sm md:text-base text-[#d9c2ba]">
          Mathematics &amp; Computer Science
          <span className="text-[#4a3a42] mx-2">|</span>
          University of Virginia
        </p>
        <p className="mt-2 text-xs text-[#4a3a42]">
          Things I&apos;ve built, taught, and written down.
        </p>
        <ScrollDownArrow />
      </section>

      {/* About */}
      <section className="py-16">
        <SectionHeading n="00" id="about" title="about" />
        <div className="text-sm text-[#d9c2ba] space-y-3">
          <p>
            Mathematics (Probability &amp; Statistics concentration) and
            Computer Science at the University of Virginia. Originally from
            Bethesda, Maryland.
          </p>
          <p>
            Interested in games and the complicated answers behind deceptively
            simple questions — using probability, statistics, and a bit of code
            to find them.
          </p>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16">
        <SectionHeading n="01" id="notes" title="notes" />
        <div className="text-sm text-[#d9c2ba] space-y-3">
          <p>LaTeX notes from coursework at UVA.</p>
          <ul className="space-y-1 pl-4">
            <li>
              <a
                href="/pdfs/BasicRealAnalyis.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4a3a42]">—</span> Basic Real Analysis
              </a>
            </li>
            <li>
              <a
                href="/pdfs/AdvancedLinearAlgebra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4a3a42]">—</span> Advanced Linear
                Algebra
              </a>
            </li>
            <li>
              <a
                href="/pdfs/Combinatorics.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4a3a42]">—</span> Combinatorics
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="py-16">
        <SectionHeading n="02" id="teaching" title="teaching" />
        <div className="text-sm text-[#d9c2ba] space-y-4">
          <p>
            Filled in to teach UVA&apos;s Fall 2024 CS 2120 (Discrete
            Mathematics I) after{" "}
            <a
              href="https://www.elizabethorrico.com/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Professor Orrico
            </a>{" "}
            left UVA for personal reasons.
          </p>
          <ul className="space-y-1 pl-4">
            <li>
              <a
                href="https://drive.google.com/file/d/1Hg4Fh8s8LziblSEHTzarVoWh0xnGjGwj/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4a3a42]">—</span> 10:00 AM lecture
                recording
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4a3a42]">—</span> 11:00 AM lecture
                recording
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16">
        <SectionHeading n="03" id="projects" title="projects and applications" />
        <BentoBox />
      </section>
    </>
  );
}
