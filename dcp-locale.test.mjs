import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = name => readFileSync(new URL(`./${name}`, import.meta.url), 'utf8');
const html = read('dailycashplan-localized.html');

assert.match(html, /locale=explicitLocale\|\|\(isNL\?'nl-NL':isES\?'es-ES':'en-US'\)/);
assert.doesNotMatch(html, /browserLocale=navigator\.language/);
assert.match(html, /euroRegions\.has\(region\)\?'EUR'/);
assert.match(read('index-en.html'), /dailycashplan-localized\.html\?lang=en/g);
assert.match(read('index-nl.html'), /lang=nl&locale=nl-NL&currency=EUR/g);
assert.match(read('index-es.html'), /lang=es&locale=es-ES&currency=EUR/g);
assert.match(read('index-es-us.html'), /lang=es&locale=es-US&currency=USD/g);
assert.match(read('dailycashplan-fr.html'), /const locale='fr-FR',currency='EUR'/);
assert.match(read('dailycashplan-de.html'), /const locale='de-DE',currency='EUR'/);
assert.match(read('dailycashplan-pt-br.html'), /const locale='pt-BR',currency='BRL'/);
assert.match(read('dailycashplan-zh-cn.html'), /const locale='zh-CN',currency='CNY'/);

console.log('Validated fixed locale/currency routing for every DCP language.');
