import catchAsync from "../libs/catchAsync";
import { getProductNameZZ, getTop10 } from "../models/statisticModels";

export const getStatisticMoneyPage = catchAsync(
    async (req, res) => {

        res.render("statistic/top10", { title: "Thống kê thu nhập" });
    }
);

const getListName = async (list) => {
    const sz = list.length;
    const arr = [];
    for (var i =0 ;i<sz;i++){
        arr.push({
            top: i+1,
            id: list[i].productId,
            name: await getProductNameZZ(list[i].productId)
        });
    }
    return arr;
}


export const getStatisticTop10Page = catchAsync(
    async (req, res) => {

        const _top10 = await getTop10();
        const top10 = await getListName(_top10);
        console.log("AAAAAAAAAAAAAA")
        console.log(top10)

        res.render("statistic/top10", { title: "Top 10 sản phẩm", top10 });
    }
);