// Shared class strings so every operation in the calculator looks consistent.

export const PRIMARY_BTN =
  "px-4 py-2 rounded text-sm font-medium bg-[#4a4a4a] text-[#ffffff] " +
  "hover:bg-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const SECONDARY_BTN =
  "px-3 py-2 rounded text-sm bg-[#efefef] text-[#404040] hover:bg-[#e0e0e0] transition-colors";

export const ERROR_TEXT = "text-sm text-[#3a3a3a] text-center";

export function emptyStringMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: Math.max(0, rows) }, () =>
    Array.from({ length: Math.max(0, cols) }, () => "")
  );
}
