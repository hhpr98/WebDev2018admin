import { Carts } from "../database/models";

export const getAllCartDatabase = async () => {
    const _items = await Carts.findAll();
    return _items;
}

export const updateCartStatus = async (id) => {
    await Carts.update({
        cartStatus: "Hoàn tất"
    }, {
        where: {
            id: id
        }
    });
}