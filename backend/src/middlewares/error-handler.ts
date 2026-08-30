// middleware/errorHandler.ts
import { ERROR_STATUS_CODES } from "@/utils/http.js";
import { DomainError, serializeError } from "../lib/errors.js";
import { mapPrismaError } from "../lib/prisma-errors.js";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, _, res) => {
  error = mapPrismaError(error);

  if (error instanceof DomainError) {
    res.status(error.code).json(serializeError(error));
    return;
  }

  console.error("Unhandled error:", error);
  res
    .status(ERROR_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
};

export default errorHandler;
