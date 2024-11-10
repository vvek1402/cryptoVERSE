import express from "express";
import LoginRequest from "../requests/LoginRequest";
import RegisterRequest from "../requests/RegisterRequest";
import { loginUser, registerUser } from "../controllers/AuthController";

const authrouter = express.Router();

authrouter.route("/login").post(LoginRequest, loginUser);

authrouter.route("/register").post(RegisterRequest, registerUser);

export default authrouter;
