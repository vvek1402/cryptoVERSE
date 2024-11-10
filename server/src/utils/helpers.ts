import { Response } from "express";

export const handleErrorResponse = (
  res: Response,
  status: number,
  message: string
): void => {
  res.status(status).json({ error: message });
};
