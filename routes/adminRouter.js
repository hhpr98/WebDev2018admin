// quản lý tất cả bên trong nó

import express from "express";
// for authenticate


import { Products } from "../database/models";

import homeRouter from "./homeRouter";
import productRouter from "./productRouter";
import accountRounter from "./accountRouter";

import { getAccountAuthenticate, getLoginPage, getRegisterPage, postRegisterPage } from "../controllers/accountController"

const adminRouter = express.Router();
adminRouter.use("/", homeRouter);
adminRouter.use("/account", accountRounter);
// adminRouter.use("/user", userRouter);
adminRouter.use("/product", productRouter);

// for login



export default adminRouter;