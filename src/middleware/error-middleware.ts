import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../utils/response";
import { ResponseError } from "../utils/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    let formattedErrors = error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    res
      .status(400)
      .json(errorResponse("Validation Error", 400, formattedErrors));
  } else if (error instanceof ResponseError) {
    res
      .status(error.status_code)
      .json(errorResponse(error.message, error.status_code));
  } else {
    res.status(500).json(errorResponse(error.message, 500));
  }
};
