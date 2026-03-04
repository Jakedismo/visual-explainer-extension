// ABOUTME: Registers template and reference files as MCP resources.
// ABOUTME: Files are read from disk at request time, always reflecting latest versions.

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as fs from "fs/promises";
import * as path from "path";

interface ResourceDef {
  name: string;
  uri: string;
  title: string;
  description: string;
  mimeType: string;
  filePath: string;
}

function buildResourceDefs(projectRoot: string): ResourceDef[] {
  return [
    {
      name: "template-architecture",
      uri: "visual-explainer://templates/architecture",
      title: "Architecture Template",
      description:
        "HTML template for architecture diagrams with CSS Layers, Container Queries, and theme cycling.",
      mimeType: "text/html",
      filePath: path.join(projectRoot, "templates", "architecture.html"),
    },
    {
      name: "template-data-table",
      uri: "visual-explainer://templates/data-table",
      title: "Data Table Template",
      description:
        "HTML template for semantic tables with sticky headers, status badges, and KPI cards.",
      mimeType: "text/html",
      filePath: path.join(projectRoot, "templates", "data-table.html"),
    },
    {
      name: "template-mermaid-flowchart",
      uri: "visual-explainer://templates/mermaid-flowchart",
      title: "Mermaid Flowchart Template",
      description:
        "HTML template for Mermaid flowcharts with ESM loading, Elk layout, and zoom controls.",
      mimeType: "text/html",
      filePath: path.join(projectRoot, "templates", "mermaid-flowchart.html"),
    },
    {
      name: "template-slide-deck",
      uri: "visual-explainer://templates/slide-deck",
      title: "Slide Deck Template",
      description:
        "HTML template for scroll-snap viewport-fit slide decks (100dvh per slide).",
      mimeType: "text/html",
      filePath: path.join(projectRoot, "templates", "slide-deck.html"),
    },
    {
      name: "reference-css-patterns",
      uri: "visual-explainer://references/css-patterns",
      title: "CSS Patterns Reference",
      description:
        "CSS design system: layers, tokens, aesthetic recipes (Blueprint, Editorial, Paper/Ink).",
      mimeType: "text/markdown",
      filePath: path.join(projectRoot, "references", "css-patterns.md"),
    },
    {
      name: "reference-libraries",
      uri: "visual-explainer://references/libraries",
      title: "Libraries Reference",
      description:
        "Curated library list: typography pairings, Mermaid.js, Chart.js, Lucide Icons, Anime.js.",
      mimeType: "text/markdown",
      filePath: path.join(projectRoot, "references", "libraries.md"),
    },
    {
      name: "reference-responsive-nav",
      uri: "visual-explainer://references/responsive-nav",
      title: "Responsive Navigation Reference",
      description:
        "Navigation patterns for multi-page HTML visualizations.",
      mimeType: "text/markdown",
      filePath: path.join(projectRoot, "references", "responsive-nav.md"),
    },
    {
      name: "reference-slide-patterns",
      uri: "visual-explainer://references/slide-patterns",
      title: "Slide Patterns Reference",
      description:
        "Slide deck engine patterns: scroll-snap, compositional variety, pacing strategies.",
      mimeType: "text/markdown",
      filePath: path.join(projectRoot, "references", "slide-patterns.md"),
    },
  ];
}

export function registerResources(
  server: McpServer,
  projectRoot: string,
): void {
  for (const def of buildResourceDefs(projectRoot)) {
    server.registerResource(
      def.name,
      def.uri,
      {
        title: def.title,
        description: def.description,
        mimeType: def.mimeType,
      },
      async (uri) => {
        const content = await fs.readFile(def.filePath, "utf-8");
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: def.mimeType,
              text: content,
            },
          ],
        };
      },
    );
  }
}
