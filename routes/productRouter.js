import express from "express";
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, getAllProductPage } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", getAllProductPage);
productRouter.get("/add", addNewProduct);
productRouter.post("/add", addNewProductPost);
productRouter.get("/edit/:id", editProduct);
productRouter.get("/delete/:id", deleteProduct);

export default productRouter;