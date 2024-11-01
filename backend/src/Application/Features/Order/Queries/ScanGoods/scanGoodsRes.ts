import { ScanGoods } from "./Types/api.js";

export const scanGoodsRes = {
  customize: async (result: ScanGoods.IScanGoodDto): Promise<ScanGoods.IScanGoodResponse> => {
    return {
        data: {
            good: result
        }
    };
  },
};