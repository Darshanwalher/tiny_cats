import type { Request, Response } from "express";
import { aiRecommendService } from "../services/aiRecommend.service.ts";
import { count } from "node:console";

export const aiRecommendController = async (req: Request, res: Response) => {
    try {

        const { kidsFriendly, apartmentFriendly } = req.body

        const result = await aiRecommendService(kidsFriendly, apartmentFriendly);

        return res.status(200).json({
            success: true,
            count: result!.length || 0,
            message: "AI recommendation successful",
            data: result,
        });
        
    } catch (error) {
        console.error("AI Recommend Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}