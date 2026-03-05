// ABOUTME: MCP server orchestrator — creates McpServer, registers all capabilities,
// ABOUTME: and connects via stdio transport.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";
import { registerPrompts } from "./prompts.js";

dotenv.config();

const server = new McpServer(
  {
    name: "visual-explainer-mcp",
    version: "0.5.0",
  },
  {
    capabilities: {
      logging: {},
    },
  },
);

registerTools(server);
registerResources(server);
registerPrompts(server);

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Visual Explainer MCP Server running on stdio");
}

run().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
