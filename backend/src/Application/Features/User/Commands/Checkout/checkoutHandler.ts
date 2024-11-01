import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { checkoutRes } from "./checkoutRes.js";


export const checkoutHandler = {
  handle: async (
    orderId: number,
    paymentMethod: string,
    total: number
  ): Promise<Checkout.ICheckoutResponse> => {
    if (paymentMethod == "line") {
      const order = await userService.checkoutByLine(orderId, total);
      const response = await checkoutRes.customize(order as Checkout.ICheckoutDeo);
      return response;
    }
    const order = await userService.checkouByDelay(orderId, total);
    const response = await checkoutRes.customize(order);
    return response;
  },
};
