// ABOUTME: Smoke test verifying the MCP test infrastructure works.
// ABOUTME: Creates a client-server pair and asserts tool listing round-trip.

import { describe, it, expect } from "vitest";
import { z } from "zod";
import { createTestClient } from "./helpers.js";

describe("test infrastructure", () => {
  it("creates a working client-server pair", async () => {
    const client = await createTestClient((server) => {
      server.registerTool("ping", {
        description: "a no-op tool",
        inputSchema: { message: z.string() },
      }, () => ({
        content: [{ type: "text", text: "pong" }],
      }));
    });
    const tools = await client.listTools();
    expect(tools.tools).toHaveLength(1);
    expect(tools.tools[0].name).toBe("ping");
  });
});
