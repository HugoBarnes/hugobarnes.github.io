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
            ? "bg-[#2c4a86] text-[#ffffff] border-[#2c4a86] font-medium"
            : "bg-[#eef1f7] text-[#262e3e] border-[#e4e9f2] hover:border-[#1a3e8c] hover:text-[#1a3e8c]"
        }`}
    >
      {comp}
    </button>
  );
}
