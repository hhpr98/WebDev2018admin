import express from "express";
import { getAccountPage,updateInfo, getAccountInfo,getAccountListPage, setAccountBlock } from "../controllers/accountController";
const accountRounter = express.Router();

accountRounter.get("/", getAccountPage);
accountRounter.post("/updateInfo", updateInfo);
// accountRounter.get("/accountlist", z);
// accountRounter.get("/account/:id", getAccountPage);
export default accountRounter;
