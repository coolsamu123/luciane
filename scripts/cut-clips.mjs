#!/usr/bin/env node
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(resolve(__dirname, "clips.json"), "utf8"));

const clipsDir = resolve(__dirname, "../public/clips");
const postersDir = resolve(__dirname, "../public/posters");
mkdirSync(clipsDir, { recursive: true });
mkdirSync(postersDir, { recursive: true });

const source = resolve(config.source);
if (!existsSync(source)) {
  console.error(`source not found: ${source}`);
  process.exit(1);
}

function run(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { stdio: "inherit" });
    p.on("close", (code) => (code === 0 ? res() : rej(new Error(`${cmd} ${code}`))));
  });
}

async function cut(clip) {
  const base720 = `${clipsDir}/${clip.name}-720`;
  const base1080 = `${clipsDir}/${clip.name}-1080`;
  const poster = `${postersDir}/${clip.name}.jpg`;
  const common = ["-ss", clip.start, "-i", source, "-t", String(clip.duration), "-an"];

  // 720p mp4
  await run("ffmpeg", [
    "-y", ...common,
    "-vf", "scale=1280:-2",
    "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    `${base720}.mp4`,
  ]);

  // 720p webm
  await run("ffmpeg", [
    "-y", ...common,
    "-vf", "scale=1280:-2",
    "-c:v", "libvpx-vp9", "-b:v", "1200k", "-deadline", "good", "-cpu-used", "2",
    `${base720}.webm`,
  ]);

  // 1080p mp4
  await run("ffmpeg", [
    "-y", ...common,
    "-vf", "scale=1920:-2",
    "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    `${base1080}.mp4`,
  ]);

  // poster (first frame)
  await run("ffmpeg", [
    "-y", "-ss", clip.start, "-i", source,
    "-frames:v", "1", "-vf", "scale=1280:-2", "-q:v", "3",
    poster,
  ]);

  console.log(`✓ ${clip.name}`);
}

const only = process.argv.slice(2);
const targets = only.length
  ? config.clips.filter((c) => only.includes(c.name))
  : config.clips;

for (const clip of targets) {
  console.log(`→ cutting ${clip.name} @ ${clip.start} for ${clip.duration}s`);
  await cut(clip);
}

console.log("done.");
