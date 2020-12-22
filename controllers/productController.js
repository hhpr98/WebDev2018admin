import {
    getProductListDatabase,
    getProductListDatabaseByCategory,
    getProductListDatabaseBySearchText,
    addNewProductDatabase,
    deleteProductDatabase,
    getOneProductDatabase,
    updateProductDatabase,
    getCategoryDatabase,
    getCategoryNameDatabase,
    updateImage1
} from "../models/productModels";
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
        res.render("product/product-add", { title: "Thêm sản phẩm" });
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

        res.redirect("/product");

    }
);

export const editProduct = catchAsync(
    async (req, res) => {

        const id = req.params.id;
        const product = await getOneProductDatabase(id);
        // console.log(product);
        res.render("product/product-edit", { title: "Chỉnh sửa sản phẩm", product });
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

        res.redirect(`/product/detail/${id}`);

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

export const getCategoryPage = catchAsync(
    async (req, res) => {
        const categoryList = await getCategoryDatabase();

        res.render("category/category-list", { title: "Loại sản phẩm", categoryList });
    }
);

export const getProductListPageByCategoryPage = catchAsync(
    async (req, res) => {

        const type = req.params.id || "1"; // loại sản phẩm
        const currentPage = +req.query.page || 1;
        const limitPerPage = 6;
        const list = await getProductListDatabaseByCategory(limitPerPage, currentPage, type);

        const totalCount = list.count || 0;
        const pageCount = Math.ceil(totalCount / limitPerPage);
        const previousPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const isPreviousPage = (currentPage <= 1 ? false : true);
        const isNextPage = (currentPage >= pageCount ? false : true);

        const _catName = await getCategoryNameDatabase(type)


        res.render("product/product-list-by-category", {
            title: "Danh sách sản phẩm theo phân loại",
            productList: list.rows,
            currentPage, pageCount, previousPage, nextPage, isPreviousPage, isNextPage,
            listPaginate: getListPaginate(currentPage, pageCount),
            type, categoryName: _catName
        });
    }
);

export const getProductListPageBySearchText = catchAsync(
    async (req, res) => {

        const text = req.query.text || ""; // text to search
        if (text === "") {
            res.redirect("/product");
            return;
        }

        const currentPage = +req.query.page || 1;
        const limitPerPage = 6;
        const list = await getProductListDatabaseBySearchText(limitPerPage, currentPage, text);

        const totalCount = list.count || 0;
        const pageCount = Math.ceil(totalCount / limitPerPage);
        const previousPage = currentPage - 1;
        const nextPage = currentPage + 1;
        const isPreviousPage = (currentPage <= 1 ? false : true);
        const isNextPage = (currentPage >= pageCount ? false : true);

        res.render("product/search", {
            title: "Tìm kiếm sản phẩm",
            productList: list.rows,
            currentPage, pageCount, previousPage, nextPage, isPreviousPage, isNextPage,
            listPaginate: getListPaginate(currentPage, pageCount),
            text
        });
    }
);

// 
export const updateProductImage = catchAsync(
    async (req, res, filename) => {
        var newUrl = "/img/uploads/" + filename;
        console.log(newUrl);
        const id = req.params.id;
        console.log(id);
        await updateImage1(id, newUrl);
        res.redirect('/product/edit/' + id);
    }
);

export const getProductDetailPage = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const product = await getOneProductDatabase(id);
        res.render("product/product-detail", { title: "Chi tiết sản phẩm", product })
    }
);