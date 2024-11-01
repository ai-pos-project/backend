import { managerService } from "../../../../../Infrastrature/Service/managerService.js";
import { updateGoodsRes } from "./updateGoodsRes.js";


export const updateGoodsHandler = {
  handle: async (
    name: string,
    stock: number,
    price: number,
    id: number,
  ): Promise<{
    message: string;
  }> => {
    await managerService.updateGoods(name, stock, price,id);
    return await updateGoodsRes.customize();
  },
};
