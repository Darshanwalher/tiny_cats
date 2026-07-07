import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client : Client | null = null;

export const getMcpClient = async() => {
    const transport = new StdioClientTransport({
        command: "tsx",
        args: ["../mcp_server/src/index.ts"],

    });

    client = new Client({
        name: "tiny-cats-client",
        version: "0.0.1",
    })

    await client.connect(transport);

    return client;

}