import type { Request, Response } from "express";
import { getMcpClient } from "../services/mcp.service.ts";
import { generateAiResponse } from "../services/ai.service.ts";

export const testMcpController = async(req:Request,res:Response) => {

    const client = await getMcpClient();

    const tools = await client.listTools();

    const result = await client.callTool({
        "name": "recommend_cats",
        "arguments": {
            kidsFriendly: req.body.kidsFriendly,
            apartmentFriendly: req.body.apartmentFriendly
        }
    })

    const content = result.content as { type: string; text: string }[] ;
    const catsData = content[0].text;

    const prompt = `
    
    Available cats

    ${catsData}

    recommend best cats from this data

    `;

    const aiResponse = await generateAiResponse(prompt);

    return res.json({
        success: true,
        data: aiResponse,
    });


}