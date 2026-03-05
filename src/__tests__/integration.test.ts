// ABOUTME: Integration test verifying all modules wire together correctly.
// ABOUTME: Tests that the full server exposes tools, resources, and prompts.

import { describe, it, expect } from "vitest";
import { createTestClient } from "./helpers.js";
import { registerTools } from "../tools.js";
import { registerResources } from "../resources.js";
import { registerPrompts } from "../prompts.js";

describe("integrated server", () => {
  it("exposes tools, resources, and prompts simultaneously", async () => {
    const client = await createTestClient((server) => {
      registerTools(server);
      registerResources(server);
      registerPrompts(server);
    });

    const { tools } = await client.listTools();
    const { resources } = await client.listResources();
    const { prompts } = await client.listPrompts();

    expect(tools).toHaveLength(3);
    expect(resources).toHaveLength(8);
    expect(prompts).toHaveLength(3);
  });
});
