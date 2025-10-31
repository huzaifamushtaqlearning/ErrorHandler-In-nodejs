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




  //second-----------------------------------------------------------------------------------------------------------------






  import { ApiError } from "./ApiError.js";
import { ApiRes } from "./ApiRes.js";
import fs from "fs";

export function globalErrorHandler(err, req, res,next) {
  let error = { ...err };
  // console.log(res)
  if (!(err instanceof ApiError)) {
    error = new ApiError(
      500,
      err._message ?? err.message ?? "Internal server error"
    );
  }

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res
    .status(error.statusCode)
    .json(
      new ApiRes(error.statusCode, error.data, error._message ?? error.message)
    );
}

};

export { globalErrorHandler };

















import fs from "fs";

import { ApiResponse,ApiError} from "./index.js";

const globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // ✅ Step 1: Agar koi uploaded file hai to hata do (rollback)
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  // ✅ Step 2: Agar error custom ApiError ka instance nahi hai
  let error;
  if (err instanceof ApiError) {
    error = err;
  } else {
    error = new ApiError(
      500,
      err._message ?? err.message ?? "Internal Server Error"
    );
  }

  // ✅ Step 3: Response message set karo (production vs dev)
  const message =
    process.env.NODE_ENV === "production"
      ? error.statusCode === 500
        ? "Internal Server Error"
        : error._message ?? error.message
      : error._message ?? error.message;

  // ✅ Step 4: Final response bhejna
  return res
    .status(error.statusCode)
    .json(new ApiResponse(error.statusCode, error.data ?? null, message));
}

export { globalErrorHandler };

