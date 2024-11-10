import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { storeUser, getUserByEmail } from "../services/AuthService";
import { User } from "../utils/interfaces";
import { handleErrorResponse } from "../utils/helpers";

const generateToken = (userId: string | undefined, email: string): string => {
  return jwt.sign(
    { user_id: userId, email },
    process.env.TOKEN_KEY as string,
    { expiresIn: "5h" }
  );
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: User | null = await getUserByEmail(email);
    if (!user) return handleErrorResponse(res, 403, "Invalid Credential");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return handleErrorResponse(res, 403, "Invalid Credential");

    const token = generateToken(user._id, email);
    res.status(200).json({ ...user, token });
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) return handleErrorResponse(res, 409, "User Already Exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData: User = { name, email: email.toLowerCase(), password: hashedPassword };

    const user = await storeUser(userData);
    const token = generateToken(user._id, email);
    res.status(201).json({ ...user, token });
  } catch (err: unknown) {
    console.error("Server error:", err);
  }
};
