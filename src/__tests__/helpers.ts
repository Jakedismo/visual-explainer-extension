// ABOUTME: Test helper that creates a linked McpServer + Client pair for protocol testing.
// ABOUTME: Uses InMemoryTransport to test MCP interactions without network IO.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

export async function createTestClient(
  setupFn: (server: McpServer) => void
): Promise<Client> {
  const server = new McpServer({
    name: "test-server",
    version: "0.0.1",
  });

  setupFn(server);

  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();

  const client = new Client({
    name: "test-client",
    version: "0.0.1",
  });

  await Promise.all([
    server.connect(serverTransport),
    client.connect(clientTransport),
  ]);

  return client;
}
