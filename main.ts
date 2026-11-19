// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The judged artifact is the X post itself, not anything this program
// computes. This program's only job is to hand the post's address to
// the grader: read POST.json from the repository root and write those
// exact bytes to POST.json inside the output directory.
//
// No network, no clock, no files outside the repository. The same
// input bytes always produce the same output bytes, so two runs agree.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const postBytes = readFileSync(resolve(repoRoot, "POST.json"));

// Fail loudly instead of handing the grader a broken address file:
// POST.json must parse as JSON and carry a url string.
const parsed = JSON.parse(postBytes.toString("utf8")) as unknown;
if (typeof parsed !== "object" || parsed === null || typeof (parsed as { url?: unknown }).url !== "string") {
  throw new Error("POST.json must be a JSON object with a string url field");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, "POST.json"), postBytes);
