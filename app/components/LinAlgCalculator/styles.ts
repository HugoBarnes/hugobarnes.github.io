// Shared class strings so every operation in the calculator looks consistent.

export const PRIMARY_BTN =
  "px-4 py-2 rounded text-sm font-medium bg-[#b8bd8f] text-[#0a070b] " +
  "hover:bg-[#9aa06e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const SECONDARY_BTN =
  "px-3 py-2 rounded text-sm bg-[#241a20] text-[#d9c2ba] hover:bg-[#3a2a30] transition-colors";

export const ERROR_TEXT = "text-sm text-[#e8837e] text-center";

export function emptyStringMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: Math.max(0, rows) }, () =>
    Array.from({ length: Math.max(0, cols) }, () => "")
  );
}
