import BentoBox from "./components/BentoBox";

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-[#1c1c1c] text-3xl font-bold mb-5"
    >
      {title}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      {/* Post-style header */}
      <section id="home" className="pt-20 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight tracking-tight">
          Hugo Barnes
        </h1>
        <p className="mt-4 text-2xl text-[#6b6b6b] leading-snug">
          Mathematics &amp; Computer Science at the University of Virginia —
          things I&apos;ve built, taught, and written down.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <img
            src="/images/Hugo.jpg"
            alt="Hugo"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="text-sm leading-tight">
            <p className="text-[#1c1c1c] font-semibold">Hugo Barnes</p>
            <p className="text-[#a0a0a0]">Charlottesville, VA</p>
          </div>
        </div>
        <hr className="mt-10 border-[#efefef]" />
      </section>

      {/* About */}
      <section className="py-16">
        <SectionHeading id="about" title="About" />
        <div className="text-lg text-[#404040] space-y-4 leading-relaxed">
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
        <SectionHeading id="notes" title="Notes" />
        <div className="text-lg text-[#404040] space-y-4 leading-relaxed">
          <p>LaTeX notes from coursework at UVA.</p>
          <ul className="space-y-1 pl-4">
            <li>
              <a
                href="/pdfs/BasicRealAnalyis.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#a0a0a0]">—</span> Basic Real Analysis
              </a>
            </li>
            <li>
              <a
                href="/pdfs/AdvancedLinearAlgebra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#a0a0a0]">—</span> Advanced Linear
                Algebra
              </a>
            </li>
            <li>
              <a
                href="/pdfs/Combinatorics.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#a0a0a0]">—</span> Combinatorics
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="py-16">
        <SectionHeading id="teaching" title="Teaching" />
        <div className="text-lg text-[#404040] space-y-4 leading-relaxed">
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
                <span className="text-[#a0a0a0]">—</span> 10:00 AM lecture
                recording
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#a0a0a0]">—</span> 11:00 AM lecture
                recording
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="py-16">
        <SectionHeading id="projects" title="Projects &amp; Applications" />
        <BentoBox />
      </section>
    </>
  );
}
