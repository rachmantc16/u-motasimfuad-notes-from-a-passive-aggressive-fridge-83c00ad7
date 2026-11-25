// Notes From a Passive-Aggressive Fridge
//
// A tiny program with a big grudge: it writes exactly one dry, petty,
// single-line note from a smart fridge to its owner into /output/entry.txt.
//
// The note is fully deterministic — no clock, no randomness, no input —
// so running this program twice produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// The fridge has been keeping receipts (and temperatures) for months.
// This is the note it finally leaves on its own door display: it brags
// about its inventory sensor, keeps the grievance small and domestic,
// and lets the sting land on the yogurt instead of explaining itself.
const NOTE =
  "You've opened me 14 times today hoping snacks would respawn. They won't. Inventory: regret, and a yogurt from March that now has tenure and benefits.";

function validate(note: string): void {
  // The bounty gate: UTF-8 text, 1–200 characters, not only whitespace,
  // exactly one line, and no trailing newline (a newline would count
  // as an extra character against the limit).
  const chars = [...note];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`note must be 1-200 characters, got ${chars.length}`);
  }
  if (note.trim().length === 0) {
    throw new Error("note must not be only whitespace");
  }
  if (note.includes("\n") || note.includes("\r")) {
    throw new Error("note must be a single line");
  }
  if (note !== note.trim()) {
    throw new Error("note must not have leading or trailing whitespace");
  }
}

function main(): void {
  validate(NOTE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: write the note exactly as composed.
  writeFileSync(OUTPUT_PATH, NOTE, { encoding: "utf8" });
}

main();
