import BentoBox from "./components/BentoBox";
import ScrollDownArrow from "./components/ScrollDownArrow";

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <div className="mb-6">
      <h2
        id={id}
        className="scroll-mt-20 text-[#10151f] text-2xl font-bold uppercase tracking-[0.15em] pb-2 border-b-2 border-[#10151f]"
      >
        {title}
      </h2>
      <div className="border-b border-[#10151f] mt-[3px]" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero — full viewport */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen text-center"
      >
        {/* Masthead */}
        <div className="w-full max-w-2xl border-t-4 border-double border-[#10151f] pt-1">
          <div className="border-t border-[#10151f]" />
        </div>
        <img
          src="/images/Hugo.jpg"
          alt="Hugo"
          className="w-32 h-32 object-cover grayscale border border-[#10151f] mt-10 mb-8"
        />
        <h1 className="text-5xl md:text-7xl font-bold text-[#10151f] tracking-tight">
          Hugo Barnes
        </h1>
        <p className="mt-6 text-xs md:text-sm text-[#262e3e] uppercase tracking-[0.3em]">
          Mathematics &amp; Computer Science &middot; University of Virginia
        </p>
        <p className="mt-3 text-sm text-[#4d576b] italic">
          Things I&apos;ve built, taught, and written down.
        </p>
        <div className="w-full max-w-2xl border-b border-[#10151f] mt-10 pb-1">
          <div className="border-b-4 border-double border-[#10151f]" />
        </div>
        <ScrollDownArrow />
      </section>

      {/* About */}
      <section className="py-16">
        <SectionHeading id="about" title="About" />
        <div className="text-sm text-[#262e3e] space-y-3">
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
        <div className="text-sm text-[#262e3e] space-y-3">
          <p>LaTeX notes from coursework at UVA.</p>
          <ul className="space-y-1 pl-4">
            <li>
              <a
                href="/pdfs/BasicRealAnalyis.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#8e99ac]">—</span> Basic Real Analysis
              </a>
            </li>
            <li>
              <a
                href="/pdfs/AdvancedLinearAlgebra.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#8e99ac]">—</span> Advanced Linear
                Algebra
              </a>
            </li>
            <li>
              <a
                href="/pdfs/Combinatorics.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#8e99ac]">—</span> Combinatorics
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Teaching */}
      <section className="py-16">
        <SectionHeading id="teaching" title="Teaching" />
        <div className="text-sm text-[#262e3e] space-y-4">
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
                <span className="text-[#8e99ac]">—</span> 10:00 AM lecture
                recording
              </a>
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1rzBw8mNJ64H_2Y4qAj71WGmSwG3vW5Uq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#8e99ac]">—</span> 11:00 AM lecture
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
