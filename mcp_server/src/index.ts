import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getAllCatsTool, recommendCatsTool } from "./tools/recommendCats.tool.ts";


// Create server instance
const server = new McpServer({
  name: "tiny_cats",
  version: "1.0.0",
});

server.registerTool(
    "recommend_cats",
    {
        title: "Recommend Cats",
        description: "Recommend best cat breeds according to the user's preferences",
        inputSchema: {
            kidsFriendly: z.boolean().describe("Whether the cat should be friendly with kids or not"),
            apartmentFriendly: z.boolean().describe("Whether the user lives in an apartment or not"),
        }
    },
    async ({kidsFriendly, apartmentFriendly}) => {
        const result = await recommendCatsTool(kidsFriendly, apartmentFriendly);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result)
                }
            ]
        }
    }
)

server.registerTool(
  "get_all_cats",
  {
    title: "all cats",
    description: "cats Data",
  },
  async () => {
    const result = await getAllCatsTool();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);

console.log("tiny cats mcp server is running...");
