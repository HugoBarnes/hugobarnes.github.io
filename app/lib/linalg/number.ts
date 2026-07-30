// Shared numeric helpers for the linear-algebra calculator.

// Parses a cell value, supporting plain numbers and simple fractions ("3/4").
// Returns NaN for anything unparseable.
export function parseNumber(val: string): number {
  const trimmed = val.trim();
  if (trimmed === "") return NaN;
  if (trimmed.includes("/")) {
    const [num, den] = trimmed.split("/").map((s) => Number(s.trim()));
    if (isNaN(num) || isNaN(den) || den === 0) return NaN;
    return num / den;
  }
  const parsed = Number(trimmed);
  return isNaN(parsed) ? NaN : parsed;
}

// Formats a result: integers stay clean, near-integers snap, and decimals are
// trimmed to a few significant places.
export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  const rounded = Math.round(n);
  if (Math.abs(n - rounded) < 1e-9) return String(rounded === 0 ? 0 : rounded);
  return parseFloat(n.toFixed(4)).toString();
}
