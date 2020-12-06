import { getAllProductDatabase, addNewProductDatabase, deleteProductDatabase, getOneProductDatabase, updateProductDatabase } from "../models/productModels";
import catchAsync from "../libs/catchAsync";

export const getAllProductPage = catchAsync(
    async (req, res) => {

        const list = await getAllProductDatabase();
        res.render("product/product-list", { list });
    }
);


export const addNewProduct = catchAsync(
    async (req, res) => {
        res.render("product/product-add");
    }

);
export const addNewProductPost = catchAsync(
    async (req, res) => {

        const productId = req.body.productId || "1x031";
        const name = req.body.name || "";
        // console.log(name);
        const originPrice = req.body.originPrice || 100000;
        const salePrice = req.body.salePrice || 99000;
        const quantity = req.body.quantity || 10;
        const description = req.body.description || "Không có";
        const branch = req.body.branch || "Không";
        const size = req.body.size || "M";
        const color = req.body.color || "Đen";

        await addNewProductDatabase(productId, name, originPrice, salePrice, quantity, description, branch, size, color);

        const list = await getAllProductDatabase();
        res.render("product/product-list", { list });
    }
);

export const editProduct = catchAsync(
    async (req, res) => {

        const id = req.params.id;
        const product = await getOneProductDatabase(id);
        // console.log(product);
        res.render("product/product-edit", { product });
    }
);

export const editProductPost = catchAsync(
    async (req, res) => {

        const id = req.params.id;

        const productId = req.body.productId || "1x031";
        const name = req.body.name || "";
        const originPrice = req.body.originPrice || 100000;
        const salePrice = req.body.salePrice || 99000;
        const quantity = req.body.quantity || 10;
        const description = req.body.description || "Không có";
        const branch = req.body.branch || "Không";
        const size = req.body.size || "M";
        const color = req.body.color || "Đen";

        await updateProductDatabase(id, productId, name, originPrice, salePrice, quantity, description, branch, size, color);

        const list = await getAllProductDatabase();
        res.render("product/product-list", { list });
    }
);

export const deleteProduct = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        await deleteProductDatabase(id);
        const list = await getAllProductDatabase();
        res.render("product/product-list", { list });
    }
)