import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    if (req.user?.userType !== "admin") {
        throw new ApiError(403, "Access denied. Admins only.");
    }

    next();
});