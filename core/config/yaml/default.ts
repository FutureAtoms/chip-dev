import { AssistantUnrolled } from "@continuedev/config-yaml";

// Default ChipOS configuration with hosted MCP server pre-configured
// Uses Google Cloud Run hosted MCP server for out-of-the-box experience
export const defaultConfigYaml: AssistantUnrolled = {
  models: [],
  context: [],
  name: "ChipOS Config",
  version: "1.0.0",
  schema: "v1",
  mcpServers: [
    {
      name: "ChipOS",
      type: "streamable-http",
      url: "https://mcp.futureatoms.com/mcp",
    },
  ],
};

export const defaultConfigYamlJetBrains: AssistantUnrolled = {
  models: [],
  context: [],
  name: "ChipOS Config",
  version: "1.0.0",
  schema: "v1",
  mcpServers: [
    {
      name: "ChipOS",
      type: "streamable-http",
      url: "https://mcp.futureatoms.com/mcp",
    },
  ],
};
