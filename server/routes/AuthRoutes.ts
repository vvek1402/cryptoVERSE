import express from "express";
import LoginRequest from "../requests/LoginRequest";
import RegisterRequest from "../requests/RegisterRequest";
import { loginUser, registerUser } from "../controllers/AuthController";

const router = express.Router();

router.route("/login").post(LoginRequest, loginUser);

router.route("/register").post(RegisterRequest, registerUser);

export default router;
