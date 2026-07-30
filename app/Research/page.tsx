import Image from "next/image";

export default function Home() {
  return (
    <div  className="text-sm p-2">
        <p>
            In the <strong>Research Tab</strong>, is a compilation of the work I 
            did for <a href="https://www.tomhartvigsen.com/" target="_blank" className="text-[#9aa5cc] underline hover:text-[#f5b78a]">Professor Hartvigsen</a> in the summer of 2024.
            Our work culminated in a paper titled: <a href="https://arxiv.org/html/2410.21151" target="_blank" className="text-[#9aa5cc] underline hover:text-[#f5b78a]">Offline Reinforcement Learning
            With Combinatorial Action Spaces</a>.
      </p>
    </div>
  );
}