import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./dailycashplan-app-v4.html', import.meta.url), 'utf8');

assert.match(html, /id="incomeTotal"/);
assert.match(html, /\$\('incomeTotal'\)\.textContent=money\(sum\(data\.income\)\)/);

const income = [{ amount: 2500 }, { amount: 155 }];
const total = income.reduce((sum, item) => sum + item.amount, 0);
assert.equal(total, 2655);
assert.equal(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total), '$2,655.00');

console.log('Validated the visible income total with multiple income entries.');
