
import { goodService } from "../../../../../Infrastrature/Service/goodService.js";
import { scanGoodsRes } from "./scanGoodsRes.js";
import { ScanGoods } from "./Types/api.js";

export const scanGoodsHandler = {
  handle: async (barcode: string): Promise<ScanGoods.IScanGoodResponse> => {
    const response = await goodService.scanGoods(barcode);

    const responseData = await scanGoodsRes.customize(response);
    return responseData;
  },
};