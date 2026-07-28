import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync("mvp-hub.html", "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];

assert.ok(script, "MVP Hub must contain its search script");
new Function(script);
assert.match(html, /My MVP Hub/);
assert.match(html, /DailyCashPlan/);
assert.match(html, /PantryPlan/);
assert.match(html, /Google Analytics/);
assert.match(html, /Microsoft Clarity/);
assert.ok((html.match(/href=/g) || []).length >= 20, "MVP Hub must include all requested links");

console.log("MVP Hub syntax, projects and tool links validated.");
