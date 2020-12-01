import { Products } from "../database/models";
import { v4 as uuid } from "uuid";

export const getAllProductDatabase = async () => {
    const product = await Products.findAll();
    return product;
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
    await Products.destroy({
        where: {
            id: id
        }
    });
}
