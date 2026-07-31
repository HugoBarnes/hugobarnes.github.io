// Shared class strings so every operation in the calculator looks consistent.

export const PRIMARY_BTN =
  "px-4 py-2 rounded text-sm font-medium bg-[var(--ss-text-soft)] text-[color:var(--ss-bg)] " +
  "hover:bg-[var(--ss-text)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors";

export const SECONDARY_BTN =
  "px-3 py-2 rounded text-sm bg-[var(--ss-rule)] text-[color:var(--ss-text-soft)] hover:bg-[var(--ss-rule-dark)] transition-colors";

export const ERROR_TEXT = "text-sm text-[color:var(--ss-text)] text-center";

export function emptyStringMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: Math.max(0, rows) }, () =>
    Array.from({ length: Math.max(0, cols) }, () => "")
  );
}
