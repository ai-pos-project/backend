
import { orderService } from "../../../../../Infrastrature/Service/orderService.js";
import { addToCartRes } from "./addToCartRes.js";
import { AddToCart } from "./Types/api.js";

export const addToCartHandler = {
  handle: async (body: AddToCart.PatchUserInfoReqBody): Promise<AddToCart.IAddToCartResponse> => {
    await orderService.addToCart(body);
    const responseData = await addToCartRes.customize();
    return responseData;
  },
};