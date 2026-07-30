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
            ? "bg-[#4a4a4a] text-[#ffffff] border-[#4a4a4a] font-medium"
            : "bg-[#fafafa] text-[#404040] border-[#efefef] hover:border-[#ff6719] hover:text-[#ff6719]"
        }`}
    >
      {comp}
    </button>
  );
}
