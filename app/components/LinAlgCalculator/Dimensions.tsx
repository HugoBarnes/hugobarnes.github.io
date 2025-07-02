import React, { useState, useEffect } from "react";

interface dimensionProps {
  rows: number;
  cols: number;
  onChange: (rows: number, cols: number) => void;
}

export default function Dimensions({ rows, cols, onChange }: dimensionProps) {
  // Local input states as strings for flexible editing
  const [rowInput, setRowInput] = useState(rows.toString());
  const [colInput, setColInput] = useState(cols.toString());

  // When props change, update local input states
  useEffect(() => {
    setRowInput(rows.toString());
  }, [rows]);

  useEffect(() => {
    setColInput(cols.toString());
  }, [cols]);

  // Handle input changes (typing)
  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRowInput(val);
    // Only call onChange if value is a valid number
    if (val === "") {
      onChange(0, cols); // empty treated as 0 for parent
    } else {
      const num = Number(val);
      if (!isNaN(num)) onChange(num, cols);
    }
  };

  const handleColChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColInput(val);
    if (val === "") {
      onChange(rows, 0);
    } else {
      const num = Number(val);
      if (!isNaN(num)) onChange(rows, num);
    }
  };

  // On focus: clear zero for easier editing
  const handleRowFocus = () => {
    if (rowInput === "0") setRowInput("");
  };

  const handleColFocus = () => {
    if (colInput === "0") setColInput("");
  };

  // On blur: if empty, reset to "0"
  const handleRowBlur = () => {
    if (rowInput.trim() === "") {
      setRowInput("0");
      onChange(0, cols);
    }
  };

  const handleColBlur = () => {
    if (colInput.trim() === "") {
      setColInput("0");
      onChange(rows, 0);
    }
  };

  return (
    <div className="flex gap-4">
      <div>
        <label> Rows: </label>
        <input
          type="number"
          value={rowInput}
          onChange={handleRowChange}
          onFocus={handleRowFocus}
          onBlur={handleRowBlur}
          className="border-2 border-black w-20"
        />
        <label> Cols: </label>
        <input
          type="number"
          value={colInput}
          onChange={handleColChange}
          onFocus={handleColFocus}
          onBlur={handleColBlur}
          className="border-2 border-black w-20"
        />
      </div>
    </div>
  );
}
