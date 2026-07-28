import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const landing = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("dailycashplan-app-v4.html", "utf8");

assert.match(landing, /Try it first\. Then join the free beta\./);
assert.doesNotMatch(landing, /removeItem\(['"]dailyCashPlanDataV3['"]\)/, "Opening DCP must never erase the saved plan");
assert.match(app, /const KEY=['"]dailyCashPlanDataV3['"]/);
assert.match(app, /Extra payment type/);
assert.match(app, /Every month/);
assert.match(app, /One-time payment now/);
assert.match(app, /function applyExtraPayment/);
assert.match(app, /class="btn add"[^>]*onclick="openExtra/);

for (const [button, list] of [
  ["＋ Add income", 'id="incomeList"'],
  ["＋ Add fixed expense", 'id="fixedList"'],
  ["＋ Add flexible expense", 'id="variableList"'],
  ["＋ Add a debt", 'id="debtList"']
]) {
  assert.ok(app.indexOf(button) < app.indexOf(list), `${button} must stay above its entries`);
}

const script = app.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script);
new Function(script);

const applyExtraCode = script.match(/function applyExtraPayment\([^}]+\}\s*:\s*\{[^}]+\}\}/)?.[0];
assert.ok(applyExtraCode, "Extra-payment calculation must be testable");
const context = {};
vm.createContext(context);
vm.runInContext(applyExtraCode, context);
assert.deepEqual(
  JSON.parse(JSON.stringify(context.applyExtraPayment(10000, 500, "one-time"))),
  {balance: 9500, extra: 0}
);
assert.deepEqual(
  JSON.parse(JSON.stringify(context.applyExtraPayment(10000, 50, "monthly"))),
  {balance: 10000, extra: 50}
);

console.log("DCP copy, Add button positions and app syntax validated.");
