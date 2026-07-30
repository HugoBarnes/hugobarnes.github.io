// Pure matrix operations shared by the calculator's operations.

export function multiply(a: number[][], b: number[][]): number[][] {
  const n = a.length;
  const m = b[0].length;
  const p = b.length;
  const out = Array.from({ length: n }, () => Array<number>(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let sum = 0;
      for (let k = 0; k < p; k++) sum += a[i][k] * b[k][j];
      out[i][j] = sum;
    }
  }
  return out;
}

export function transpose(a: number[][]): number[][] {
  const rows = a.length;
  const cols = a[0]?.length ?? 0;
  const out = Array.from({ length: cols }, () => Array<number>(rows).fill(0));
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) out[j][i] = a[i][j];
  return out;
}

export function identity(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

export function power(a: number[][], p: number): number[][] {
  const n = a.length;
  if (p <= 0) return identity(n);
  let result = a.map((row) => row.slice());
  for (let i = 1; i < p; i++) result = multiply(result, a);
  return result;
}

// Determinant via Gaussian elimination with partial pivoting (O(n^3)).
export function determinant(a: number[][]): number {
  const n = a.length;
  const m = a.map((row) => row.slice());
  let det = 1;
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    }
    if (Math.abs(m[pivot][col]) < 1e-12) return 0;
    if (pivot !== col) {
      [m[col], m[pivot]] = [m[pivot], m[col]];
      det = -det;
    }
    det *= m[col][col];
    for (let r = col + 1; r < n; r++) {
      const factor = m[r][col] / m[col][col];
      for (let k = col; k < n; k++) m[r][k] -= factor * m[col][k];
    }
  }
  return det;
}
