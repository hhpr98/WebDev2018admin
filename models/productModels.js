import { Products, Categories, Op } from "../database/models";
import { v4 as uuid } from "uuid";

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

export const getOneProductDatabase = async (id) => {
    const product = await Products.findByPk(id);
    return product;
}

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

export const deleteProductDatabase = async (id) => {
    await Products.update({
        isDeleted: 1
    }, {
        where: {
            id: id
        }
    });
}

export const getCategoryDatabase = async () => {

    const _category = await Categories.findAll({
        where: {
            isDeleted: 0
        }
    });

    return _category;
}

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

export const getCategoryNameDatabase = async (id) => {
    const _category = await Categories.findByPk(id);
    return _category === null ? "trống" : _category.name;
}

export const updateImage1 = async (id, new_imgurl) => {
    const product = await Products.findByPk(id);
    await product.update({
        image1: new_imgurl
    })
    return null;
}