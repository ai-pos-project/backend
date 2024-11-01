import { managerService } from "../../../../../Infrastrature/Service/managerService.js";
import { deleteGoodsRes } from "./deleteGoodsRes.js";


export const deleteGoodsHandler = {
  handle: async (
    goodId: number,
  ): Promise<{
    message: string;
  }> => {
    await managerService.deleteGoods(goodId);
    return await deleteGoodsRes.customize();
  },
};
