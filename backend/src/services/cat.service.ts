import catModel from "../models/cat.model.ts";

/**
 * Creates a new cat
 * @param payload
 * @returns The created cat object
 */
export const createCatService = async (payload: object) => {
    try {
        return await catModel.create(payload);
    } catch (error) {
        console.error("Create Cat Service Error:", error);
        throw error;
    }
};

/**
 * Fetches all cats
 * @returns An array of cat objects
 */
export const getAllCatsService = async () => {
    try {
        return await catModel.find();
    } catch (error) {
        console.error("Get All Cats Service Error:", error);
        throw error;
    }
};

/**
 * Fetches a single cat by ID
 * @param id
 * @returns A cat object
 */
export const getSingleCatService = async (id: string) => {
    try {
        return await catModel.findById(id);
    } catch (error) {
        console.error("Get Single Cat Service Error:", error);
        throw error;
    }
};

/**
 * Searches for cats by name or breed
 * @param query
 * @returns Matching cat objects
 */
export const searchCatsService = async (query: string) => {
    try {
        return await catModel.find({
            $or: [
                {
                    name: {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    breed: {
                        $regex: query,
                        $options: "i",
                    },
                },
            ],
        });
    } catch (error) {
        console.error("Search Cats Service Error:", error);
        throw error;
    }
};

/**
 * Recommends cats based on kidsFriendly and apartmentFriendly
 * @param kidsFriendly
 * @param apartmentFriendly
 * @returns Matching cat objects
 */
export const recommendCatsService = async (
    kidsFriendly: boolean,
    apartmentFriendly: boolean
) => {
    try {
        return await catModel.find({
            kidsFriendly,
            apartmentFriendly,
        });
    } catch (error) {
        console.error("Recommend Cats Service Error:", error);
        throw error;
    }
};