import { Products } from "../database/models";
import { getAllProductDatabase } from "../models/productModels";

export const getAllProductPage = async (req, res) => {

    // code ở đây...........

    const list = await getAllProductDatabase();
    res.render("product/product-list", { list });
}

export const addNewProduct = (req, res) => {

    // code ở đây...........
    res.render("home/index");
}

export const addNewProductPost = (req, res) => {

    // code ở đây...........
    res.render("home/index");
}

export const editProduct = (req, res) => {

    // code ở đây...........
    res.render("home/index");
}

export const deleteProduct = (req, res) => {
    // code ở đây...........
    res.render("home/index");
}