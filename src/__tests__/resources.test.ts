// ABOUTME: Tests for the resources module.
// ABOUTME: Verifies all templates and references are listed and readable via embedded assets.

import { describe, it, expect } from "vitest";
import { createTestClient } from "./helpers.js";
import { registerResources } from "../resources.js";

describe("resources", () => {
  it("lists all 8 template and reference resources", async () => {
    const client = await createTestClient((server) =>
      registerResources(server)
    );
    const { resources } = await client.listResources();

    const uris = resources.map((r) => r.uri);

    expect(uris).toContain("visual-explainer://templates/architecture");
    expect(uris).toContain("visual-explainer://templates/data-table");
    expect(uris).toContain("visual-explainer://templates/mermaid-flowchart");
    expect(uris).toContain("visual-explainer://templates/slide-deck");
    expect(uris).toContain("visual-explainer://references/css-patterns");
    expect(uris).toContain("visual-explainer://references/libraries");
    expect(uris).toContain("visual-explainer://references/responsive-nav");
    expect(uris).toContain("visual-explainer://references/slide-patterns");

    expect(resources).toHaveLength(8);
  });

  it("resources have titles and descriptions", async () => {
    const client = await createTestClient((server) =>
      registerResources(server)
    );
    const { resources } = await client.listResources();

    for (const resource of resources) {
      expect(resource.name).toBeTruthy();
      expect(resource.description).toBeTruthy();
      expect(resource.mimeType).toBeTruthy();
    }
  });

  it("returns HTML content for template resources", async () => {
    const client = await createTestClient((server) =>
      registerResources(server)
    );
    const result = await client.readResource({
      uri: "visual-explainer://templates/architecture",
    });

    expect(result.contents).toHaveLength(1);
    expect(result.contents[0].mimeType).toBe("text/html");
    expect(result.contents[0].text).toContain("<!DOCTYPE html>");
  });

  it("returns markdown content for reference resources", async () => {
    const client = await createTestClient((server) =>
      registerResources(server)
    );
    const result = await client.readResource({
      uri: "visual-explainer://references/css-patterns",
    });

    expect(result.contents).toHaveLength(1);
    expect(result.contents[0].mimeType).toBe("text/markdown");
    expect(result.contents[0].text).toBeTruthy();
  });
});
