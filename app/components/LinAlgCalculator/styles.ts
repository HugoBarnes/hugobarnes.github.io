// Shared class strings so every operation in the calculator looks consistent.

export const PRIMARY_BTN =
  "px-4 py-2 rounded text-sm font-medium bg-[#2c4a86] text-[#ffffff] " +
  "hover:bg-[#223a69] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const SECONDARY_BTN =
  "px-3 py-2 rounded text-sm bg-[#e4e9f2] text-[#262e3e] hover:bg-[#cfd7e4] transition-colors";

export const ERROR_TEXT = "text-sm text-[#1f3a70] text-center";

export function emptyStringMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: Math.max(0, rows) }, () =>
    Array.from({ length: Math.max(0, cols) }, () => "")
  );
}
