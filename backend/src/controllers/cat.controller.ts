import type { Request, Response } from "express";
import {
    createCatService,
    getAllCatsService,
    getSingleCatService,
    recommendCatsService,
    searchCatsService,
} from "../services/cat.service.ts";

/**
 * Create a new cat
 */
export const createCatController = async (req: Request, res: Response) => {
    try {
        const cat = await createCatService(req.body);

        return res.status(201).json({
            success: true,
            message: "Cat created successfully.",
            data: cat,
        });
    } catch (error) {
        console.error("Create Cat Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

/**
 * Fetch all cats
 */
export const getAllCatsController = async (_req: Request, res: Response) => {
    try {
        const cats = await getAllCatsService();

        return res.status(200).json({
            success: true,
            message: "Cats fetched successfully.",
            count: cats.length,
            data: cats,
        });
    } catch (error) {
        console.error("Get All Cats Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

/**
 * Fetch a single cat
 */
export const getSingleCatController = async (req: Request, res: Response) => {
    try {
        const cat = await getSingleCatService(req.params.id as string);

        if (!cat) {
            return res.status(404).json({
                success: false,
                message: "Cat not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cat fetched successfully.",
            data: cat,
        });
    } catch (error) {
        console.error("Get Single Cat Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

/**
 * Search cats
 */
export const searchCatsController = async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;

        if (!q || typeof q !== "string") {
            return res.status(400).json({
                success: false,
                message: "Query parameter 'q' is required.",
            });
        }

        const cats = await searchCatsService(q);

        return res.status(200).json({
            success: true,
            message: cats.length
                ? "Cats found successfully."
                : "No cats found.",
            count: cats.length,
            data: cats,
        });
    } catch (error) {
        console.error("Search Cats Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

/**
 * Recommend cats
 */
export const recommendCatsController = async (
    req: Request,
    res: Response
) => {
    try {
        const { kidsFriendly, apartmentFriendly } = req.body as {
            kidsFriendly: boolean;
            apartmentFriendly: boolean;
        };

        if (
            typeof kidsFriendly !== "boolean" ||
            typeof apartmentFriendly !== "boolean"
        ) {
            return res.status(400).json({
                success: false,
                message:"kidsFriendly and apartmentFriendly must be boolean values.",
            });
        }

        const cats = await recommendCatsService(
            kidsFriendly,
            apartmentFriendly
        );

        return res.status(200).json({
            success: true,
            message: cats.length
                ? "Cats recommended successfully."
                : "No matching cats found.",
            count: cats.length,
            data: cats,
        });
    } catch (error) {
        console.error("Recommend Cats Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};