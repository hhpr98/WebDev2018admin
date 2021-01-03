import express from "express";
import homeRouter from "./homeRouter";
import productRouter from "./productRouter";
import accountRounter from "./accountRouter";
// import userRouter from "./userRouter";
const indexRouter = express.Router();

indexRouter.use("/", homeRouter);
indexRouter.use("/account", accountRounter);
// indexRouter.use("/user", userRouter);git
indexRouter.use("/product", productRouter);

export default indexRouter;