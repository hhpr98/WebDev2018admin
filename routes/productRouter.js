import express from "express";
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, editProductPost, getAllProductPage } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", getAllProductPage);
productRouter.get("/add", addNewProduct);
productRouter.post("/add", addNewProductPost);
productRouter.get("/edit/:id", editProduct);
productRouter.post("/edit/:id", editProductPost);
productRouter.get("/delete/:id", deleteProduct);

export default productRouter;