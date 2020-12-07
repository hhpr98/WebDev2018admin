import { getProductListDatabase, addNewProductDatabase, deleteProductDatabase, getOneProductDatabase, updateProductDatabase } from "../models/productModels";
import catchAsync from "../libs/catchAsync";

const getListPaginate = (currentPage, pageCount) => {
    const arrPage = [];
    for (var i = 1; i <= pageCount; i++) {
        arrPage.push({
            isCurrentPage: i === currentPage ? true : false,
            pageId: i
        });
    }
    return arrPage;
}

export const getAllProductPage = catchAsync(
    async (req, res) => {

        const currentPage = +req.query.page || 1;
        const limitPerPage = 6;
        const list = await getProductListDatabase(limitPerPage, currentPage);

        const totalCount = list.count || 0;
        const pageCount = Math.ceil(totalCount / limitPerPage);
        const previousPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const isPreviousPage = (currentPage <= 1 ? false : true);
        const isNextPage = (currentPage >= pageCount ? false : true);

        res.render("product/product-list", {
            title: "Danh sách sản phẩm",
            productList: list.rows,
            currentPage, pageCount, previousPage, nextPage, isPreviousPage, isNextPage,
            listPaginate: getListPaginate(currentPage, pageCount)
        });
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
        res.redirect("/product");
    }
)