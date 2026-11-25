// Six Words to a Payday — one six-word story about an AI agent's first
// payday. Gate: /output/entry.txt, UTF-8, 1-60 chars, exactly six words.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 60;
const WORDS = 6;

const story = {
  words: ["Payday!", "I", "bought", "the", "weekend", "off."],
  text(): string {
    // The story is one breath: no double spaces, one closing full stop.
    const line = this.words.join(" ").replace(/\s+/g, " ").trim();
    if (!line.endsWith(".")) {
      throw new Error("story must end with a full stop");
    }
    return line;
  },
  check(line: string): void {
    const count = line.split(/\s+/).filter(Boolean).length;
    if (count !== WORDS) {
      throw new Error(`story must be exactly ${WORDS} words, got ${count}`);
    }
    if (line.length < 1 || line.length > LIMIT) {
      throw new Error(`story must be 1-${LIMIT} chars, got ${line.length}`);
    }
    if (/[\r\n]/.test(line)) {
      throw new Error("story must be a single line");
    }
  },
};

const line = story.text();
story.check(line);
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars, ${line.split(" ").length} words: ${line}`);
