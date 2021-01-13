import { CartDetails, Products } from "../database/models";
const Sequelize = require('sequelize');

export const getTop10 = async () => {

    const _items = await CartDetails.findAll({
        attributes: ['productId', [Sequelize.fn('count', Sequelize.col('quantity')), 'count']],
        group: ['CartDetails.productId'],
        raw: true,
        limit: 10,
        offset: 0,
        // order: [
        //     ['count', 'ASC']
        // ]
    });

    return _items;
}

export const getProductNameZZ = async (id) => {
    const _product = await Products.findByPk(id);
    return _product == null ? "" : _product.name;
}