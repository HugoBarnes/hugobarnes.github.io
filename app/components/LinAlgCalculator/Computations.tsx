"use client";

import React from "react";

interface ComputationsProps {
  comp: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

// A single operation tab. Highlights when it is the active computation.
export default function Computations({ comp, active, onClick }: ComputationsProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm transition-colors cursor-pointer border
        ${
          active
            ? "bg-[#b8bd8f] text-[#0a070b] border-[#b8bd8f] font-medium"
            : "bg-[#1a1218] text-[#d9c2ba] border-[#241a20] hover:border-[#9aa5cc] hover:text-[#9aa5cc]"
        }`}
    >
      {comp}
    </button>
  );
}
