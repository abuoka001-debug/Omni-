import test from "node:test";
import assert from "node:assert/strict";
import { getActiveSearchProviders } from "../../open-sse/config/searchRegistry.ts";
import { webSearchInput } from "../../open-sse/mcp-server/schemas/tools.ts";

test("getActiveSearchProviders returns dynamic list of active search provider IDs", () => {
  const active = getActiveSearchProviders();
  assert.ok(Array.isArray(active));
  assert.ok(active.length > 0);
  assert.ok(active.includes("serper-search"));
  assert.ok(active.includes("brave-search"));

  // Check blocked providers filtering
  const filtered = getActiveSearchProviders(["serper-search"]);
  assert.equal(filtered.includes("serper-search"), false);
  assert.ok(filtered.includes("brave-search"));
});

test("webSearchInput provider schema is dynamically backed by getActiveSearchProviders", () => {
  const parsed = webSearchInput.safeParse({
    query: "test query",
    provider: "serper-search",
  });
  assert.equal(parsed.success, true);
});
