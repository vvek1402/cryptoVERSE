import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleErrorResponse } from "../utils/helpers";
import { CustomRequest } from "../utils/interfaces";

const Authenticate = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleErrorResponse(res, 401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY!, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return handleErrorResponse(res, 401, "Invalid token");
      }

      req.userid = (decoded as JwtPayload).user_id;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
  }
};

export default Authenticate;
