import express from "express";
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, editProductPost, getAllProductPage, getCategoryPage, getProductListPageByCategoryPage, getProductListPageBySearchText } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", getAllProductPage);
productRouter.get("/add", addNewProduct);
productRouter.post("/add", addNewProductPost);
productRouter.get("/edit/:id", editProduct);
productRouter.post("/edit/:id", editProductPost);
productRouter.get("/delete/:id", deleteProduct);
productRouter.get("/category", getCategoryPage);
productRouter.get("/category/:id", getProductListPageByCategoryPage);
productRouter.get("/search", getProductListPageBySearchText);

export default productRouter;