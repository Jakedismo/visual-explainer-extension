// ABOUTME: Tests for the image generation tools module.
// ABOUTME: Verifies tool listing, schema correctness, and error handling.

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createTestClient } from "./helpers.js";
import { registerTools } from "../tools.js";

describe("tools", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    savedEnv.GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    savedEnv.NANOBANANA_GEMINI_API_KEY = process.env.NANOBANANA_GEMINI_API_KEY;
  });

  afterEach(() => {
    if (savedEnv.GEMINI_API_KEY !== undefined) {
      process.env.GEMINI_API_KEY = savedEnv.GEMINI_API_KEY;
    } else {
      delete process.env.GEMINI_API_KEY;
    }
    if (savedEnv.NANOBANANA_GEMINI_API_KEY !== undefined) {
      process.env.NANOBANANA_GEMINI_API_KEY = savedEnv.NANOBANANA_GEMINI_API_KEY;
    } else {
      delete process.env.NANOBANANA_GEMINI_API_KEY;
    }
  });

  it("lists three image generation tools", async () => {
    const client = await createTestClient((server) => registerTools(server));
    const { tools } = await client.listTools();

    const names = tools.map((t) => t.name);
    expect(names).toContain("generate_image");
    expect(names).toContain("generate_icon");
    expect(names).toContain("generate_pattern");
    expect(tools).toHaveLength(3);
  });

  it("generate_image has correct input schema properties", async () => {
    const client = await createTestClient((server) => registerTools(server));
    const { tools } = await client.listTools();

    const tool = tools.find((t) => t.name === "generate_image")!;
    expect(tool.inputSchema.properties).toHaveProperty("prompt");
    expect(tool.inputSchema.properties).toHaveProperty("aspectRatio");
    expect(tool.inputSchema.properties).toHaveProperty("count");
    expect(tool.inputSchema.required).toContain("prompt");
  });

  it("generate_icon has correct input schema properties", async () => {
    const client = await createTestClient((server) => registerTools(server));
    const { tools } = await client.listTools();

    const tool = tools.find((t) => t.name === "generate_icon")!;
    expect(tool.inputSchema.properties).toHaveProperty("prompt");
    expect(tool.inputSchema.properties).toHaveProperty("style");
    expect(tool.inputSchema.required).toContain("prompt");
  });

  it("tools have annotations", async () => {
    const client = await createTestClient((server) => registerTools(server));
    const { tools } = await client.listTools();

    for (const tool of tools) {
      expect(tool.annotations).toBeDefined();
      expect(tool.annotations!.readOnlyHint).toBe(false);
      expect(tool.annotations!.openWorldHint).toBe(true);
    }
  });

  it("returns error when API key is missing", async () => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.NANOBANANA_GEMINI_API_KEY;

    const client = await createTestClient((server) => registerTools(server));
    const result = await client.callTool({
      name: "generate_image",
      arguments: { prompt: "test" },
    });

    expect(result.isError).toBe(true);
    expect(result.content).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: expect.stringContaining("GEMINI_API_KEY"),
        }),
      ])
    );
  });
});
