"use client";

import React, { useEffect, useState } from "react";

interface DimensionProps {
  rows: number;
  cols: number;
  onChange: (rows: number, cols: number) => void;
  lockCols?: boolean; // for square-only operations
  label?: string;
}

function NumberField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-[color:var(--ss-text-soft)]">
      {label}
      <input
        type="number"
        min={1}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-16 h-9 px-2 text-center rounded bg-[var(--ss-bg-soft)] text-[color:var(--ss-text)]
          border border-[color:var(--ss-rule-dark)] outline-none focus:border-[color:var(--ss-accent)] transition-colors
          disabled:opacity-50 tabular-nums"
      />
    </label>
  );
}

export default function Dimensions({
  rows,
  cols,
  onChange,
  lockCols,
  label,
}: DimensionProps) {
  const [rowInput, setRowInput] = useState(rows.toString());
  const [colInput, setColInput] = useState(cols.toString());

  useEffect(() => setRowInput(rows.toString()), [rows]);
  useEffect(() => setColInput(cols.toString()), [cols]);

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRowInput(val);
    const num = val === "" ? 0 : Number(val);
    if (!isNaN(num)) onChange(num, lockCols ? num : cols);
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColInput(val);
    const num = val === "" ? 0 : Number(val);
    if (!isNaN(num)) onChange(rows, num);
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {label && <span className="text-xs text-[color:var(--ss-accent)]">{label}</span>}
      <div className="flex gap-4">
        <NumberField label="Rows" value={rowInput} onChange={handleRowChange} />
        <NumberField
          label="Cols"
          value={lockCols ? rowInput : colInput}
          onChange={handleColChange}
          disabled={lockCols}
        />
      </div>
    </div>
  );
}
