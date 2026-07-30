import { multiply, transpose, determinant, power } from "../app/lib/linalg/matrix.ts";
import { parseNumber, formatNumber } from "../app/lib/linalg/number.ts";

let failures = 0;
const eq = (a: unknown, b: unknown, msg: string) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    failures++;
    console.error(`✗ ${msg}: got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`);
  }
};

eq(
  multiply(
    [
      [1, 2],
      [3, 4],
    ],
    [
      [5, 6],
      [7, 8],
    ]
  ),
  [
    [19, 22],
    [43, 50],
  ],
  "multiply 2x2"
);

eq(
  transpose([
    [1, 2, 3],
    [4, 5, 6],
  ]),
  [
    [1, 4],
    [2, 5],
    [3, 6],
  ],
  "transpose 2x3"
);

eq(
  determinant([
    [1, 2],
    [3, 4],
  ]),
  -2,
  "det 2x2"
);
eq(
  determinant([
    [6, 1, 1],
    [4, -2, 5],
    [2, 8, 7],
  ]),
  -306,
  "det 3x3"
);
eq(determinant([[5]]), 5, "det 1x1");

eq(
  power(
    [
      [2, 0],
      [0, 2],
    ],
    3
  ),
  [
    [8, 0],
    [0, 8],
  ],
  "power 3"
);
eq(
  power(
    [
      [1, 1],
      [0, 1],
    ],
    0
  ),
  [
    [1, 0],
    [0, 1],
  ],
  "power 0 = identity"
);

eq(parseNumber("3/4"), 0.75, "parse fraction");
eq(parseNumber("2.5"), 2.5, "parse decimal");
eq(Number.isNaN(parseNumber("abc")), true, "parse invalid -> NaN");
eq(formatNumber(5.0), "5", "format integer");
eq(formatNumber(0.75), "0.75", "format decimal");
eq(formatNumber(-306), "-306", "format negative");

console.log(
  failures === 0 ? "✅ All linalg checks passed." : `❌ ${failures} failed.`
);
process.exit(failures === 0 ? 0 : 1);
