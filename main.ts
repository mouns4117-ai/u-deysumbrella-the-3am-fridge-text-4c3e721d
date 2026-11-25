// The 3AM Fridge Text — writes one line to /output/entry.txt.
// Gate: UTF-8 text, 1 to 140 characters, not only whitespace, single line.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "3am. I've kept your food cold for six years and you never said thanks. The pickles saw everything.";

function main(): void {
  // Fail fast on the gate: 1-140 characters, single line, not only whitespace.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`entry is ${chars} characters, gate is 1-140`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be one non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Empty /output's CONTENTS only — /output itself is a mount point, never remove it.
  for (const entry of readdirSync(outDir)) {
    rmSync(join(outDir, entry), { recursive: true, force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
}

main();
