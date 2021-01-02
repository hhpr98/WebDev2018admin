import express from "express";
import { getAccountPage,updateInfo } from "../controllers/accountController";
const accountRounter = express.Router();

accountRounter.get("/", getAccountPage);
accountRounter.post("/updateInfo", updateInfo);

export default accountRounter;
