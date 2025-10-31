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
//------------------------------------------------
import { ApiError } from "./ApiError.js";
import { ApiRes } from "./ApiRes.js";

export const globalErrorHandler = (error, req, res, next) => {
  if (!(error instanceof ApiError)) {
    res
      .status(500)
      .json(
        new ApiRes(
          500,
          null,
          error._message ?? error.message ?? "Internal Server Error"
        )
      );
  }
  res
    .status(error.statusCode)
    .json(new ApiRes(error.statusCode, error.data, error.message));
};
//---------------best of the best ----------------------//


import fs from "fs";

import { ApiResponse,ApiError} from "./index.js";

const globalErrorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

   if (!(err instanceof ApiError)) {
    res
      .status(500)
      .json(
        new ApiRes(
          500,
          null,
          err._message ?? err.message ?? "Internal Server Error"
        )
      );
  }
   res
    .status(err.statusCode)
    .json(new ApiResponse(err.statusCode, err.data, err.message));
};

export { globalErrorHandler };
