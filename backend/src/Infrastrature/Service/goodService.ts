
import { ScanGoods } from "../../Application/Features/Order/Queries/ScanGoods/Types/api.js";
import { Good } from "../../Database/Entities/good.js";
import { GoodsNotFoundError } from "../../Errors/error.js";
import { goodsRepo } from "../Repository/goodsRepo.js";

export const goodService = {
    scanGoods: async (barcode: string): Promise<ScanGoods.IScanGoodDto> => {
        const good = await goodsRepo.findByBarcode(barcode);
        if(!good) {
            throw new GoodsNotFoundError();
        }
        return {
            name: good.name,
            price: good.price,
            barcode: good.barcode,
        };
    },
}