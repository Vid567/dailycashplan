import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./dailycashplan-localized.html', import.meta.url), 'utf8');

assert.match(html, /locale=explicitLocale\|\|\(isNL\?'nl-NL':isES\?'es-ES':'en-US'\)/);
assert.doesNotMatch(html, /browserLocale=navigator\.language/);
assert.match(html, /euroRegions\.has\(region\)\?'EUR'/);

console.log('Validated English defaults to en-US/USD independent of the phone locale.');
