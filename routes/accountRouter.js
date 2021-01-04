import express from "express";
import {
    getAccountPage,
    updateInfo,
    getAllAccountPage,
    getAccountDetail,
    lockSelectedAccount,
    editAccountDetail,
    updateAccountDetail

} from "../controllers/accountController";
const accountRounter = express.Router();

accountRounter.get("/", getAccountPage);
accountRounter.get("/account-list",getAllAccountPage);
accountRounter.post("/updateInfo", updateInfo);
accountRounter.get("/detail/:id", getAccountDetail);
accountRounter.get("/lock/:id&:isBanned", lockSelectedAccount);

// accountRounter.get("/edit/:id", getAccountPage);
// accountRounter.post("/edit/:id", getAccountPage);

// accountRounter.get("/accountlist", z);
// accountRounter.get("/account/:id", getAccountPage);
export default accountRounter;
