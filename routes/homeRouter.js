import express from "express";
import { getHomePage } from "../controllers/homeController";
const homeRouter = express.Router();

homeRouter.get("/", getHomePage);

export default homeRouter;
