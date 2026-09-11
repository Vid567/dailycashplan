import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('./dailycashplan-app-v4.html', import.meta.url), 'utf8');
const match = html.match(/function parseLocalizedNumber\(value\)\{[^\n]+\}/);
assert.ok(match, 'parseLocalizedNumber must exist in the app');

const context = {};
vm.createContext(context);
vm.runInContext(`${match[0]};this.parseLocalizedNumber=parseLocalizedNumber`, context);
const parse = context.parseLocalizedNumber;

const cases = new Map([
  ['1250', 1250],
  ['1,250', 1250],
  ['1.250', 1250],
  ['1,250.75', 1250.75],
  ['1.250,75', 1250.75],
  ['1250.75', 1250.75],
  ['1250,75', 1250.75],
  ['$ 1,250.75', 1250.75],
  ['12.5', 12.5],
  ['18.25', 18.25],
]);

for (const [input, expected] of cases) {
  assert.equal(parse(input), expected, `${input} should parse as ${expected}`);
}

assert.match(html, /inputmode="decimal"/, 'mobile numeric inputs should use a decimal keyboard');
console.log(`Validated ${cases.size} US and European number formats.`);
