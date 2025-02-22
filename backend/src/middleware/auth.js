import jwt from "jsonwebtoken";
import { Patient } from "../Models/patient.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new ApiError(401, "Invalid token");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const patient = await Patient.findById(decoded?._id).select(
      "-password -refreshToken"
    );

    if (!patient) {
      throw new ApiError(401, "Invalid token");
    }
    req.patient = patient;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid token");
  }
});
