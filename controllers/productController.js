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
    updateImage1,
    updateImage2,
    updateImage3
} from "../models/productModels";
import catchAsync from "../libs/catchAsync";
import { getAllCartDatabase, updateCartStatus } from "../models/cartModels";

// hàm lấy mảng paginate dựa vào tổng số trang vào số trang hiện tại
//  [
//      {
//          pageId: 1,
//          isCurrentPage: false, 
//      }, {
//          pageId: 2,
//          isCurrentPage: true, 
//      }, {......
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

// Danh sách sản phẩm
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

// Thêm 1 sản phẩm
export const addNewProduct = catchAsync(
    async (req, res) => {
        const category = await getCategoryDatabase();
        res.render("product/product-add", { title: "Thêm sản phẩm", category });
    }
);

// Action : thêm 1 sản phẩm
export const addNewProductPost = catchAsync(
    async (req, res) => {

        const name = req.body.name || "";
        const originPrice = req.body.originprice || 100000;
        const salePrice = req.body.saleprice || 99000;
        const salePercent = req.body.salepercent || 0;
        const quantity = req.body.quantity || 100;
        const description = req.body.description || "Không có mô tả";
        const branch = req.body.branch || "Không";
        const size = req.body.size || "M";
        const color = req.body.color || "Đen";
        const image1 = req.body.image1 || "/img/product-default.jpg";
        const image2 = req.body.image2 || "/img/product-default.jpg";
        const image3 = req.body.image3 || "/img/product-default.jpg";
        const specification1 = req.body.specification1 || "Đang cập nhật";
        const specification2 = req.body.specification2 || "Đang cập nhật";
        const specification3 = req.body.specification3 || "Đang cập nhật";
        const catId = req.body.catId || "1";

        await addNewProductDatabase(name, originPrice, salePrice, salePercent, quantity, description, branch, size, color, image1, image2, image3, specification1, specification2, specification3, catId);

        res.redirect("/dashboard/product");

    }
);

// Chỉnh sửa sản phẩm
export const editProduct = catchAsync(
    async (req, res) => {

        const id = req.params.id;
        const product = await getOneProductDatabase(id);
        const categoryName = await getCategoryNameDatabase(product.type);
        const category = await getCategoryDatabase();
        res.render("product/product-edit", {
            title: "Chỉnh sửa sản phẩm",
            product, categoryName, category
        });
    }
);

// Action : chỉnh sửa sản phẩm
export const editProductPost = catchAsync(
    async (req, res) => {

        const id = req.params.id || "1111"; // không có thì đưa id sai, khi đó update cũng không thành công
        const name = req.body.name || "";
        const originPrice = req.body.originprice || 100000;
        const salePrice = req.body.saleprice || 99000;
        const salePercent = req.body.salepercent || 0;
        const quantity = req.body.quantity || 100;
        const description = req.body.description || "Không có mô tả";
        const branch = req.body.branch || "Không";
        const size = req.body.size || "M";
        const color = req.body.color || "Đen";
        const image1 = req.body.image1 || "/img/product-default.jpg";
        const image2 = req.body.image2 || "/img/product-default.jpg";
        const image3 = req.body.image3 || "/img/product-default.jpg";
        const specification1 = req.body.specification1 || "Đang cập nhật";
        const specification2 = req.body.specification2 || "Đang cập nhật";
        const specification3 = req.body.specification3 || "Đang cập nhật";
        const catId = req.body.catId || "1";

        await updateProductDatabase(id, name, originPrice, salePrice, salePercent, quantity, description, branch, size, color, image1, image2, image3, specification1, specification2, specification3, catId);

        res.redirect(`/dashboard/product/detail/${id}`);

    }
);

// Action : xóa 1 sản phẩm
export const deleteProduct = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        await deleteProductDatabase(id);
        res.redirect("/dashboard/product");
    }
);

// Danh sách loại sản phẩm
export const getCategoryPage = catchAsync(
    async (req, res) => {
        const categoryList = await getCategoryDatabase();

        res.render("category/category-list", { title: "Loại sản phẩm", categoryList });
    }
);

// Lấy danh sách sản phẩm dựa vào category
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

// Lấy danh sách sản phẩm dựa vào từ khóa tìm kiếm
export const getProductListPageBySearchText = catchAsync(
    async (req, res) => {

        const text = req.query.text || ""; // text to search
        if (text === "") {
            res.redirect("/dashboard/product");
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

// Upload hình ảnh
export const updateProductImage = catchAsync(
    async (req, res, filename) => {
        var newUrl = "/img/uploads/" + filename;
        const id = req.params.id;
        const num = req.params.num;
        console.log(typeof num);
        console.log(num);

        if (num == "1")
            await updateImage1(id, newUrl);
        if (num == "2")
            await updateImage2(id, newUrl);
        if (num == "3")
            await updateImage3(id, newUrl);
        res.redirect('/dashboard/product/edit/' + id);
    }
);

// Trang chi tiết sản phẩm
export const getProductDetailPage = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const product = await getOneProductDatabase(id);
        const categoryName = await getCategoryNameDatabase(product.type);
        const category = await getCategoryDatabase();
        res.render("product/product-detail", {
            title: "Chi tiết sản phẩm",
            product, categoryName, category
        });
    }
);

// Trang quản lí đơn đặt hàng
export const getCartManagementPage = catchAsync(
    async (req, res) => {

        const cart = await getAllCartDatabase();
        res.render("cart/cart-management", {
            title: "Quản lí đơn đặt hàng",
            cart
        });
    }
);

// Action : Hoàn tất đơn hàng
export const finishCart = catchAsync(
    async (req, res) => {

        const cartId = req.params.id || "0";

        await updateCartStatus(cartId);

        res.redirect("/dashboard/product/cart");
    }
);