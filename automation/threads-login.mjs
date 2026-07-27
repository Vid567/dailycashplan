import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const profileDir = path.join(__dirname, '.threads-profile');

const context = await chromium.launchPersistentContext(profileDir, {
  headless: false,
  channel: 'chrome',
  viewport: null,
  args: ['--start-maximized']
});

const page = context.pages()[0] ?? await context.newPage();
await page.goto('https://www.threads.net/', { waitUntil: 'domcontentloaded' });

console.log('\nLog handmatig in op Threads.');
console.log('Sluit daarna het browservenster. Je sessie wordt lokaal bewaard.\n');

await context.waitForEvent('close');
