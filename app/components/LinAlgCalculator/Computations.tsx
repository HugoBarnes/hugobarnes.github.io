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
            ? "bg-[var(--ss-text-soft)] text-[color:var(--ss-bg)] border-[color:var(--ss-text-soft)] font-medium"
            : "bg-[var(--ss-bg-soft)] text-[color:var(--ss-text-soft)] border-[color:var(--ss-rule)] hover:border-[color:var(--ss-accent)] hover:text-[color:var(--ss-accent)]"
        }`}
    >
      {comp}
    </button>
  );
}
