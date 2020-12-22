import express from "express";
import multer from "multer"
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, editProductPost, getAllProductPage, getCategoryPage, getProductListPageByCategoryPage, getProductListPageBySearchText, updateProductImage, getProductDetailPage } from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/", getAllProductPage);
productRouter.get("/detail/:id", getProductDetailPage);
productRouter.get("/add", addNewProduct);
productRouter.post("/add", addNewProductPost);
productRouter.get("/edit/:id", editProduct);
productRouter.post("/edit/:id", editProductPost);
productRouter.get("/delete/:id", deleteProduct);
productRouter.get("/category", getCategoryPage);
productRouter.get("/category/:id", getProductListPageByCategoryPage);
productRouter.get("/search", getProductListPageBySearchText);

// set storrage for image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

// upload router
productRouter.post('/detail/upload/:id', upload.single('file'), (req, res) => {
  updateProductImage(req, res, req.file.originalname);
});

export default productRouter;