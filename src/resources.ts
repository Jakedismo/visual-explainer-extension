// ABOUTME: Registers template and reference files as MCP resources.
// ABOUTME: Content is served from embedded assets generated at build time.

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { templates, references } from "./embedded-assets.js";

interface ResourceDef {
  name: string;
  uri: string;
  title: string;
  description: string;
  mimeType: string;
  content: string;
}

const resourceDefs: ResourceDef[] = [
  {
    name: "template-architecture",
    uri: "visual-explainer://templates/architecture",
    title: "Architecture Template",
    description:
      "HTML template for architecture diagrams with CSS Layers, Container Queries, and theme cycling.",
    mimeType: "text/html",
    content: templates.architecture,
  },
  {
    name: "template-data-table",
    uri: "visual-explainer://templates/data-table",
    title: "Data Table Template",
    description:
      "HTML template for semantic tables with sticky headers, status badges, and KPI cards.",
    mimeType: "text/html",
    content: templates.dataTable,
  },
  {
    name: "template-mermaid-flowchart",
    uri: "visual-explainer://templates/mermaid-flowchart",
    title: "Mermaid Flowchart Template",
    description:
      "HTML template for Mermaid flowcharts with ESM loading, Elk layout, and zoom controls.",
    mimeType: "text/html",
    content: templates.mermaidFlowchart,
  },
  {
    name: "template-slide-deck",
    uri: "visual-explainer://templates/slide-deck",
    title: "Slide Deck Template",
    description:
      "HTML template for scroll-snap viewport-fit slide decks (100dvh per slide).",
    mimeType: "text/html",
    content: templates.slideDeck,
  },
  {
    name: "reference-css-patterns",
    uri: "visual-explainer://references/css-patterns",
    title: "CSS Patterns Reference",
    description:
      "CSS design system: layers, tokens, aesthetic recipes (Blueprint, Editorial, Paper/Ink).",
    mimeType: "text/markdown",
    content: references.cssPatterns,
  },
  {
    name: "reference-libraries",
    uri: "visual-explainer://references/libraries",
    title: "Libraries Reference",
    description:
      "Curated library list: typography pairings, Mermaid.js, Chart.js, Lucide Icons, Anime.js.",
    mimeType: "text/markdown",
    content: references.libraries,
  },
  {
    name: "reference-responsive-nav",
    uri: "visual-explainer://references/responsive-nav",
    title: "Responsive Navigation Reference",
    description:
      "Navigation patterns for multi-page HTML visualizations.",
    mimeType: "text/markdown",
    content: references.responsiveNav,
  },
  {
    name: "reference-slide-patterns",
    uri: "visual-explainer://references/slide-patterns",
    title: "Slide Patterns Reference",
    description:
      "Slide deck engine patterns: scroll-snap, compositional variety, pacing strategies.",
    mimeType: "text/markdown",
    content: references.slidePatterns,
  },
];

export function registerResources(server: McpServer): void {
  for (const def of resourceDefs) {
    server.registerResource(
      def.name,
      def.uri,
      {
        title: def.title,
        description: def.description,
        mimeType: def.mimeType,
      },
      async (uri) => ({
        contents: [
          {
            uri: uri.href,
            mimeType: def.mimeType,
            text: def.content,
          },
        ],
      }),
    );
  }
}
