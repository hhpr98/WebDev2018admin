// quản lý tất cả bên trong nó

import express from "express";

// for authenticate
import homeRouter from "./homeRouter";
import productRouter from "./productRouter";
import accountRounter from "./accountRouter";
import statisticRouter from "./statisticRouter";

const adminRouter = express.Router();
adminRouter.use("/", homeRouter);
adminRouter.use("/account", accountRounter);
// adminRouter.use("/user", userRouter);
adminRouter.use("/product", productRouter);
adminRouter.use("/statistic", statisticRouter);

// for login



export default adminRouter;