import express from "express";
import { Products } from "../database/models";
import homeRouter from "./homeRouter";
import productRouter from "./productRouter";
const indexRouter = express.Router();

indexRouter.use("/", homeRouter);
indexRouter.use("/product", productRouter);
indexRouter.get("/test", async (req, res) => { // test thử connect database
    const product = await Products.findAll();
    console.log(product); // test OK
    res.render("home/index");
});

export default indexRouter;