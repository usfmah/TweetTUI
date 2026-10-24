import { test, expect, afterEach } from "bun:test";
import { mkdtemp, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { ensureConfigDir } from "../src/config/paths.ts";

// Saved when the file loads, before any test changes it
const oldHome = process.env.TWEETUI_HOME;
let tmp: string | undefined;

afterEach(async () => {
  if (oldHome === undefined) {
    delete process.env.TWEETUI_HOME;
  } else {
    process.env.TWEETUI_HOME = oldHome;
  }

  if (tmp) {
    await rm(tmp, { recursive: true, force: true });
    tmp = undefined;
  }
});

test("ensureConfigDir creates the folder inside TWEETUI_HOME", async () => {
  tmp = await mkdtemp(path.join(os.tmpdir(), "tweetui-test-"));
  const configDir = path.join(tmp, "config");
  process.env.TWEETUI_HOME = configDir;

  const result = await ensureConfigDir();


  expect(result).toBe(configDir);

  
  const info = await stat(configDir);
  expect(info.isDirectory()).toBe(true);

  
  expect(result.startsWith(path.join(os.homedir(), ".config"))).toBe(false);
});
