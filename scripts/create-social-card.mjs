import sharp from 'sharp';

const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f8f6ec"/>
  <circle cx="955" cy="325" r="310" fill="#dce5b8"/>
  <g fill="#203d32" font-family="sans-serif">
    <text x="65" y="105" font-size="23" font-weight="700" letter-spacing="3">TRICKY TACTICS</text>
    <text x="60" y="260" font-size="82" font-weight="800" letter-spacing="-4">Small board.</text>
    <text x="60" y="350" font-size="82" font-weight="800" letter-spacing="-4" fill="#ad472c">Big strategy.</text>
    <text x="65" y="410" font-size="24">The newest auto battler in town.</text>
    <rect x="65" y="477" width="265" height="49" rx="7" fill="#203d32"/>
    <text x="88" y="509" font-size="19" font-weight="700" fill="#f8f6ec">Currently in closed beta</text>
  </g>
</svg>`);
const hexcaster = await sharp('src/assets/characters/hexcaster-three-quarter.webp')
  .resize({ width: 380, height: 500, fit: 'inside' }).png().toBuffer();
const frogWitch = await sharp('src/assets/characters/frog-witch.webp')
  .resize({ width: 350, height: 420, fit: 'inside' }).png().toBuffer();
await sharp(background).composite([
  { input: hexcaster, top: 90, left: 650 },
  { input: frogWitch, top: 205, left: 835 },
]).png().toFile('static/images/social-card.png');
