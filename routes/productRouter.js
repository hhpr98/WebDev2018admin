import express from "express";
import multer  from "multer"
import { addNewProduct, addNewProductPost, deleteProduct, editProduct, editProductPost, getAllProductPage, getCategoryPage, getProductListPageByCategoryPage, getProductListPageBySearchText, updateProductImage } from "../controllers/productController";
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

// upload router
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


  productRouter.post('/detail/upload', upload.single('file'),(req, res)=>{
    updateProductImage(req, res, req.file.originalname);
})
export default productRouter;