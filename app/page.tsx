import BentoBox from "./components/BentoBox";

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
      className="scroll-mt-20 text-[#88c0d0] text-2xl mb-6 border-b border-[#3b4252] pb-2"
    >
      <span className="text-[#4c566a]">[{n}]</span>{" "}
      <span className="text-[#a3be8c]">#</span> {title}
    </h2>
  );
}

export default function Home() {
  return (
    <div className="space-y-24 py-12 text-sm leading-relaxed">
      {/* hero */}
      <section id="home" className="scroll-mt-20 pt-4">
        <p className="text-[#a3be8c] mb-3">
          <span className="text-[#4c566a]">$</span> whoami
        </p>
        <h1 className="text-4xl md:text-5xl text-[#eceff4] mb-6">
          Hugo Barnes
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src="/images/Hugo.jpg"
            alt="Hugo"
            className="w-40 rounded border border-[#3b4252]"
          />
          <div className="text-[#d8dee9] space-y-3">
            <p>
              Mathematics (Probability &amp; Statistics concentration) and
              Computer Science at the University of Virginia. Originally from
              Bethesda, Maryland.
            </p>
            <p>
              Interested in games and the complicated answers behind
              deceptively simple questions — using probability, statistics, and
              a bit of code to find them.
            </p>
            <p className="text-[#4c566a]">
              <span className="text-[#a3be8c]">$</span> cd ./sections
            </p>
          </div>
        </div>
      </section>

      {/* notes */}
      <section>
        <SectionHeading n="01" id="notes" title="notes" />
        <div className="text-[#d8dee9] space-y-3">
          <p>
            LaTeX notes from coursework at UVA. Typeset as I go; corrections
            welcome.
          </p>
          <ul className="space-y-1 pl-4">
            <li>
              <a
                href="/pdfs/BasicRealAnalyis.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4c566a]">—</span> Basic Real Analysis
              </a>
            </li>
            <li>
              <a
                href="/pdfs/AdvancedLinearAlgebra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4c566a]">—</span> Advanced Linear
                Algebra
              </a>
            </li>
            <li>
              <a
                href="/pdfs/Combinatorics.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4c566a]">—</span> Combinatorics
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* teaching */}
      <section>
        <SectionHeading n="02" id="teaching" title="teaching" />
        <div className="text-[#d8dee9] space-y-4">
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
                <span className="text-[#4c566a]">—</span> 10:00 AM lecture
                recording
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#4c566a]">—</span> 11:00 AM lecture
                recording
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* projects */}
      <section>
        <SectionHeading n="03" id="projects" title="projects and applications" />
        <BentoBox />
      </section>
    </div>
  );
}
