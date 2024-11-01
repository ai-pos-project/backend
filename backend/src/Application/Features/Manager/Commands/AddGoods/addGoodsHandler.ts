import { managerService } from "../../../../../Infrastrature/Service/managerService.js";
import { addGoodsRes } from "./addGoodsRes.js";

export const addGoodsHandler = {
  handle: async (
    name: string,
    stock: number,
    price: number,
    barcode: string
  ): Promise<{
    message: string;
  }> => {
    await managerService.addGoods(name, stock, price, barcode);
    return await addGoodsRes.customize();
  },
};
