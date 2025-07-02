import Image from "next/image";

export default function Home() {
  return (
    <div>
        <img src="/images/Hugo.jpg" alt="Hugo" className="float-left mr-2 mb-2 w-1/6 p-2"></img>
        <div className="text-sm p-2">
          <p className="mb-4">
            I am currently a student at the University of Virginia in 
            Charlottesville studying Mathematics (Probability and Statistics concentration) and Computer Science.
            I am originally from Bethesda, Maryland. To make this 
            website, I am using Next.js 15 and Typescript.
          </p>
          <p className="mb-4">
            Before UVA, I played soccer for D.C. United's Academy Team and Bethesda Soccer Club's Academy Team. 
            I received a D1 offer to play soccer at Davidson. I currently am a practice player for UVA's Varsity 
            Women's Soccer Team.
          </p>
          <p className="mb-4">
            I am interested in games and how to beat them! I think there are a lot of really complicated answers
            to seemingly simple questions, and I use Probability and Statistics concepts and my Computer Science 
            background to find solutions. 
          </p>
          <p className="mb-4">
            In the footer below, you will find my <strong>LinkedIn, GitHub,</strong> and <strong>CV</strong>.
          </p>
        </div>
    </div>
  );
}
