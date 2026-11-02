// Rebuild website derivatives without copying the 400 MB recording into the repo.
// node scripts/prepare-game-media.mjs <screenshots-directory> <recording.mp4>
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const [screenshots, recording] = process.argv.slice(2);
if (!screenshots || !recording) throw new Error('Pass the screenshot directory and recording path. Requires ffmpeg.');
const images = new URL('../src/assets/game/', import.meta.url);
const videos = new URL('../static/videos/', import.meta.url);
await mkdir(images, { recursive: true });
await mkdir(videos, { recursive: true });

for (const [source, name] of [
  ['IMG_0840.png', 'deck'], ['IMG_0841.png', 'collection'],
  ['IMG_0842.png', 'gear-selection'], ['IMG_0843.png', 'units'],
  ['IMG_0844.png', 'gears'], ['IMG_0845.png', 'emotes'],
]) {
  await sharp(join(screenshots, source)).rotate().webp({ quality: 86 }).toFile(new URL(`${name}.webp`, images).pathname);
}

function ffmpeg(args) {
  const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error('ffmpeg failed');
}

for (const [second, name] of [[16, 'positioning'], [204, 'battle'], [191, 'battle-poster']]) {
  const frame = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-ss', String(second),
    '-i', recording, '-frames:v', '1', '-vf', 'scale=900:-2', '-f', 'image2pipe', '-c:v', 'png', '-'],
    { maxBuffer: 20 * 1024 * 1024 });
  if (frame.status !== 0) throw new Error(frame.stderr.toString());
  await sharp(frame.stdout).webp({ quality: 90 }).toFile(new URL(`${name}.webp`, images).pathname);
}

// A native-orientation excerpt: preparation, then battle. Audio is intentionally omitted.
ffmpeg(['-ss', '191', '-i', recording, '-t', '24', '-an', '-vf', 'scale=720:-2,fps=30',
  '-c:v', 'libx264', '-crf', '25', '-preset', 'medium', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', new URL('gameplay-beta.mp4', videos).pathname]);

// Editorial crops retain the real game art; full originals remain available above.
await sharp(new URL('deck.webp', images).pathname).extract({ left: 20, top: 660, width: 850, height: 760 })
  .webp({ quality: 90 }).toFile(new URL('squad-crop.webp', images).pathname);
await sharp(new URL('emotes.webp', images).pathname).extract({ left: 90, top: 630, width: 1010, height: 245 })
  .webp({ quality: 90 }).toFile(new URL('emotes-crop.webp', images).pathname);
console.log('Prepared six screenshots, three recording frames, two editorial crops and a 31-second gameplay excerpt.');
