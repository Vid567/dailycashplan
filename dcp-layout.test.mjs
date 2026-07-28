import fs from "node:fs";
import assert from "node:assert/strict";

const landing = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("dailycashplan-app-v4.html", "utf8");

assert.match(landing, /Try it first\. Then join the free beta\./);

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

console.log("DCP copy, Add button positions and app syntax validated.");
