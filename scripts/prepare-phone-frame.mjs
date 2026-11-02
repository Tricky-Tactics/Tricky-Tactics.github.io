import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const [source] = process.argv.slice(2);
if (!source) throw new Error('Pass the 740 × 740 iPhone-frame image path.');
const metadata = await sharp(source).metadata();
if (metadata.width !== 740 || metadata.height !== 740) throw new Error('This mask is fitted to the supplied 740 × 740 frame.');
const output = new URL('../src/assets/devices/', import.meta.url);
await mkdir(output, { recursive: true });

const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="372" height="732">
  <defs><mask id="frame">
    <rect width="372" height="732" fill="black"/>
    <rect x="4" y="3" width="364" height="725" rx="67" fill="white"/>
    <rect x="14" y="13" width="344" height="701" rx="48" fill="black"/>
    <rect x="137" y="23" width="98" height="26" rx="14" fill="white"/>
  </mask></defs>
  <rect width="372" height="732" fill="white" mask="url(#frame)"/>
</svg>`);
await sharp(source).extract({ left: 184, top: 4, width: 372, height: 732 }).ensureAlpha()
  .composite([{ input: mask, blend: 'dest-in' }]).webp({ lossless: true })
  .toFile(new URL('iphone-frame.webp', output).pathname);
console.log('Prepared transparent bezel and camera island; original image unchanged.');
