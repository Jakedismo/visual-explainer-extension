// ABOUTME: Registers reusable prompt templates for visual content generation.
// ABOUTME: Prompts use completable() for enum autocompletion on aesthetic and type fields.

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completable } from "@modelcontextprotocol/sdk/server/completable.js";

const AESTHETICS = ["blueprint", "editorial", "paper-ink"] as const;
const DIAGRAM_TYPES = [
  "flowchart",
  "architecture",
  "sequence",
  "er-diagram",
] as const;

export function registerPrompts(server: McpServer): void {
  /*
  server.registerPrompt(
    "create-diagram",
    {
      title: "Create Diagram",
      description:
        "Generate a visual diagram using the visual-explainer design system.",
      argsSchema: {
        topic: z.string().describe("The subject of the diagram"),
        diagramType: completable(
          z.enum(DIAGRAM_TYPES).describe("Type of diagram to create"),
          (value) =>
            DIAGRAM_TYPES.filter((t) =>
              t.toLowerCase().startsWith(String(value).toLowerCase())
            )
        ),
        aesthetic: completable(
          z
            .enum(AESTHETICS)
            .default("blueprint")
            .describe("Visual aesthetic"),
          (value) =>
            AESTHETICS.filter((a) =>
              a.toLowerCase().startsWith(String(value).toLowerCase())
            )
        ),
      },
    },
    ({ topic, diagramType, aesthetic }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Create a ${diagramType} diagram about "${topic}" using the ${aesthetic ?? "blueprint"} aesthetic from the visual-explainer design system. Use the mermaid-flowchart template as a structural reference. The output should be a single self-contained HTML file with inlined CSS and JavaScript.`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "create-slide-deck",
    {
      title: "Create Slide Deck",
      description:
        "Generate a magazine-quality slide deck using the visual-explainer design system.",
      argsSchema: {
        topic: z.string().describe("The subject of the presentation"),
        slideCount: z
          .string()
          .default("8")
          .describe("Number of slides (3-20)"),
        aesthetic: completable(
          z
            .enum(AESTHETICS)
            .default("editorial")
            .describe("Visual aesthetic"),
          (value) =>
            AESTHETICS.filter((a) =>
              a.toLowerCase().startsWith(String(value).toLowerCase())
            )
        ),
      },
    },
    ({ topic, slideCount, aesthetic }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Create a ${slideCount ?? "8"}-slide presentation about "${topic}" using the ${aesthetic ?? "editorial"} aesthetic from the visual-explainer design system. Use the slide-deck template as a structural reference. Each slide should be 100dvh with scroll-snap. Output a single self-contained HTML file.`,
          },
        },
      ],
    })
  );

  server.registerPrompt(
    "create-data-table",
    {
      title: "Create Data Table",
      description:
        "Generate a styled data table using the visual-explainer design system.",
      argsSchema: {
        topic: z.string().describe("What data the table represents"),
        columns: z.string().describe("Description of the columns needed"),
      },
    },
    ({ topic, columns }) => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Create a styled data table for "${topic}" with columns: ${columns}. Use the data-table template as a structural reference. Include sticky headers, status badges where appropriate, and KPI summary cards above the table. Output a single self-contained HTML file with the editorial aesthetic.`,
          },
        },
      ],
    })
  );
  */
}
