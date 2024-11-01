
import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { getCartItemsRes } from "./getCartItemsRes.js";
import { GetCartItems } from "./Types/api.js";

export const getCartItemsHandler = {
  handle: async (orderId: number): Promise<GetCartItems.IGetCartItemsResponse> => {
    const cartItems = await userService.getCartItems(orderId);
    const response = await getCartItemsRes.customize(cartItems);
    return response;
  },
};