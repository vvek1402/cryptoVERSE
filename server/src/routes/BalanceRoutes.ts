import express from "express";
import Authenticate from "../middleware/AuthMiddleware";
import { getBalance, getPaymentLogs, updateBalance } from "../controllers/BalanceController";

const balancerouter = express.Router();

balancerouter.route("/").get(Authenticate, getBalance);
balancerouter.route("/").post(Authenticate, updateBalance);
balancerouter.route("/payment-log").get(Authenticate, getPaymentLogs);

export default balancerouter;