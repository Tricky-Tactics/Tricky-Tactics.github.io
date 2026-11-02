import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const component = await readFile(new URL('../src/components/PhoneMockup.astro', import.meta.url), 'utf8');
assert.match(component, /iphone-16-pro-figma\.webp/, 'Use the original transparent Figma bezel');
assert.match(component, /aspect-ratio: 450 \/ 920/, 'Keep the Figma outer-frame proportions');
for (const geometry of ['24 / 450', '23 / 920', '402 / 450', '874 / 920']) {
  assert.ok(component.includes(geometry), `Missing Figma viewport geometry: ${geometry}`);
}
assert.match(component, /object-fit: cover/, 'Fill the viewport without letterboxed borders');
const { data, info } = await sharp(new URL('../src/assets/devices/iphone-16-pro-figma.webp', import.meta.url).pathname)
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert.equal(info.width / info.height, 450 / 920);
const alphaAt = (x, y) => data[(Math.round(y * info.height) * info.width + Math.round(x * info.width)) * 4 + 3];
assert.equal(alphaAt(0.5, 0.5), 0, 'The game must show through the bezel');
assert.equal(alphaAt(0, 0), 0, 'The outer corners must be transparent');
assert.ok(alphaAt(0.5, 55 / 920) > 240, 'Preserve the Dynamic Island');
console.log('Phone frame matches Figma geometry and transparency.');
