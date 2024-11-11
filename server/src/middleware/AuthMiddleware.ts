import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleErrorResponse } from "../utils/helpers";
import { CustomRequest } from "../utils/interfaces";

const Authenticate = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return handleErrorResponse(res, 401, "Unauthorized");

  jwt.verify(token, process.env.TOKEN_KEY!, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userid = (decoded as { user_id: string }).user_id;
    next();
  });
};

export default Authenticate;
