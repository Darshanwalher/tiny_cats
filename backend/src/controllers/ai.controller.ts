import type { Request, Response } from "express";
import { generateAiResponse } from "../services/ai.service.ts";


export async function askAiController (req:Request,res:Response) {
    try {
        const prompt = req.body.prompt as string;
        const result = await generateAiResponse(prompt);
        return res.status(200).json({
            success: true,
            message: "AI Response generated successfully",
            data: result
        });
    } catch (error) {
        console.error("Ask AI Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}