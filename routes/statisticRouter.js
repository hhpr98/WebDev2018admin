import express from "express";
import { getStatisticMoneyPage, getStatisticTop10Page } from "../controllers/statisticController";

const statisticRouter = express.Router();

statisticRouter.get("/money", getStatisticMoneyPage);
statisticRouter.get("/top10", getStatisticTop10Page);

export default statisticRouter;