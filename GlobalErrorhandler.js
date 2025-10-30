import fs from "fs";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const globalErrorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  const error =
    err instanceof ApiError
      ? err
      : new ApiError(500, null, err._message ?? err.message);

  return res
    .status(error.statusCode)
    .json(
      new ApiResponse(
        error.statusCode,
        error.data ?? null,
        process.env.NODE_ENV === "production"
          ? error.statusCode === 500
            ? "Internal Server Error"
            : error._message ?? error.message
          : error._message ?? error.message
      )
    );
};

export { globalErrorHandler };
