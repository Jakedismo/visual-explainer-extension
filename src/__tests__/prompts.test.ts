// ABOUTME: Tests for the prompt templates module.
// ABOUTME: Verifies prompt listing, argument schemas, and message generation.

import { describe, it, expect } from "vitest";
import { createTestClient } from "./helpers.js";
import { registerPrompts } from "../prompts.js";

describe("prompts", () => {
  it("lists three prompt templates", async () => {
    const client = await createTestClient((server) => registerPrompts(server));
    const { prompts } = await client.listPrompts();

    const names = prompts.map((p) => p.name);
    expect(names).toContain("create-diagram");
    expect(names).toContain("create-slide-deck");
    expect(names).toContain("create-data-table");
    expect(prompts).toHaveLength(3);
  });

  it("prompts have descriptions", async () => {
    const client = await createTestClient((server) => registerPrompts(server));
    const { prompts } = await client.listPrompts();

    for (const prompt of prompts) {
      expect(prompt.description).toBeTruthy();
    }
  });

  it("create-diagram returns a message containing the topic", async () => {
    const client = await createTestClient((server) => registerPrompts(server));
    const result = await client.getPrompt({
      name: "create-diagram",
      arguments: {
        topic: "microservices",
        diagramType: "architecture",
        aesthetic: "blueprint",
      },
    });

    expect(result.messages).toHaveLength(1);
    expect(result.messages[0].role).toBe("user");
    const content = result.messages[0].content;
    expect(content).toMatchObject({
      type: "text",
      text: expect.stringContaining("microservices"),
    });
  });

  it("create-slide-deck returns a message with slide count", async () => {
    const client = await createTestClient((server) => registerPrompts(server));
    const result = await client.getPrompt({
      name: "create-slide-deck",
      arguments: {
        topic: "quarterly results",
        slideCount: "12",
        aesthetic: "editorial",
      },
    });

    expect(result.messages).toHaveLength(1);
    const text = (result.messages[0].content as { text: string }).text;
    expect(text).toContain("quarterly results");
    expect(text).toContain("12");
  });

  it("create-data-table returns a message with column info", async () => {
    const client = await createTestClient((server) => registerPrompts(server));
    const result = await client.getPrompt({
      name: "create-data-table",
      arguments: {
        topic: "user activity",
        columns: "name, email, last login, status",
      },
    });

    expect(result.messages).toHaveLength(1);
    const text = (result.messages[0].content as { text: string }).text;
    expect(text).toContain("user activity");
    expect(text).toContain("name, email, last login, status");
  });
});
