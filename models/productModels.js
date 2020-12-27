import { Products, Categories, Op } from "../database/models";
import { v4 as uuid } from "uuid";

// Lấy toàn bộ danh sách sản phẩm 
// Result: list + count
export const getProductListDatabase = async (limit, page) => {

    const _product = await Products.findAndCountAll({
        where: {
            isDeleted: 0
        },
        limit: limit,
        offset: limit * (page - 1)
    });

    return _product;
}

// Lấy 1 sản phẩm từ database
// Result: single product
export const getOneProductDatabase = async (id) => {
    const product = await Products.findByPk(id);
    return product;
}

// Thêm 1 sản phẩm mới
// Input : infor product
// Result : 
export const addNewProductDatabase = async (productId, name, originPrice, salePrice, quantity, description, branch, size, color) => {
    await Products.create({
        id: uuid(),
        productId: productId,
        name: name,
        originPrice: originPrice,
        salePrice: salePrice,
        quantity: quantity,
        description: description,
        branch: branch,
        size: size,
        color: color,
        type: 1
    });
}

// Cập nhật dữ liệu cho 1 sản phẩm
// Input : infor product
// Result : 
export const updateProductDatabase = async (id, productId, name, originPrice, salePrice, quantity, description, branch, size, color) => {
    await Products.update({
        productId: productId,
        name: name,
        originPrice: originPrice,
        salePrice: salePrice,
        quantity: quantity,
        description: description,
        branch: branch,
        size: size,
        color: color
    }, {
        where: {
            id: id
        }
    });
}

// Xóa 1 sản phẩm
// Đánh dấu isDeleted = 1
// Input : product id
// Result : 
export const deleteProductDatabase = async (id) => {
    await Products.update({
        isDeleted: 1
    }, {
        where: {
            id: id
        }
    });
}

// Lấy toàn bộ danh sách sản phẩm
// Result : list category
export const getCategoryDatabase = async () => {

    const _category = await Categories.findAll({
        where: {
            isDeleted: 0
        }
    });

    return _category;
}

// Lấy danh sách sản phẩm (dựa vào phân loại)
// Result : count + list
export const getProductListDatabaseByCategory = async (limit, page, type) => {

    const _product = await Products.findAndCountAll({
        where: {
            isDeleted: 0,
            type: type
        },
        limit: limit,
        offset: limit * (page - 1)
    });

    return _product;
}

// Lấy danh sách sản phẩm (dựa vào từ khóa tìm kiếm)
// Result : count + list
export const getProductListDatabaseBySearchText = async (limit, page, text) => {

    const _product = await Products.findAndCountAll({
        where: {
            isDeleted: 0,
            name: {
                [Op.like]: `%${text}%`
            }
        },
        limit: limit,
        offset: limit * (page - 1)
    });
    return _product;
}

// Trả về tên của loại sản phẩm dựa vào id
// Input: category id
// Result: category name
export const getCategoryNameDatabase = async (id) => {
    const _category = await Categories.findByPk(id);
    return _category === null ? "trống" : _category.name;
}

// Cập nhật hình ảnh
export const updateImage1 = async (id, new_imgurl) => {
    const product = await Products.findByPk(id);
    await product.update({
        image1: new_imgurl
    })
    return null;
}