import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const [renders, content] = process.argv.slice(2);
if (!renders || !content) throw new Error('Pass the render directory and the game client content directory.');
const output = new URL('../src/assets/characters/', import.meta.url);
await mkdir(output, { recursive: true });

const sources = [
  [join(renders, 'ren_Hexcaster_1.png'), 'hexcaster-front'],
  [join(renders, 'ren_Hexcaster_2.png'), 'hexcaster-three-quarter'],
  [join(renders, 'ren_Hexcaster_3.png'), 'hexcaster-profile'],
  [join(renders, 'ren_FrogWitch_3.png'), 'frog-witch'],
  [join(renders, 'flatren_Skeleton_2.png'), 'skeleton'],
  ...['teary', 'panic', 'grin', 'sparkle'].map((expression) => [
    join(content, 'cosmetics', 'emotes', `nugget_${expression}.png`), `nugget-${expression}`,
  ]),
];

for (const [source, name] of sources) {
  await sharp(source).rotate().trim({ threshold: 5 })
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100 })
    .toFile(new URL(`${name}.webp`, output).pathname);
}
console.log('Prepared five transparent character renders and four original emotes. Source assets are unchanged.');
