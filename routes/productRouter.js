import express from "express";
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, getAllProductPage } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", getAllProductPage);
productRouter.get("/add", addNewProduct);
productRouter.post("/add", addNewProductPost);
productRouter.post("/edit/:id", editProduct);
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;