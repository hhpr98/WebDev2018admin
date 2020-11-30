import express from "express";
const indexRouter = express.Router();

indexRouter.use("/", homeRouter);
indexRouter.use("/product", productRouter);

export default indexRouter;