import { Products } from "../database/models";

export const getAllProductDatabase = async () => {
    const product = await Products.findAll();
    return product;
}