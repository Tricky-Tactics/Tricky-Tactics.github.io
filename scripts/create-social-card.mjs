// Renders scripts/social-card/card.html to static/images/social-card.png (1200 × 630) with headless Chrome.
// Usage: node scripts/create-social-card.mjs [path-to-chrome]
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = process.argv[2]
  ?? process.env.CHROME_PATH
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const page = pathToFileURL(resolve('scripts/social-card/card.html')).href;
const output = resolve('static/images/social-card.png');

execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
  '--window-size=1200,630', '--virtual-time-budget=3000', `--screenshot=${output}`, page,
], { stdio: 'ignore' });
console.log(`Wrote ${output}`);
