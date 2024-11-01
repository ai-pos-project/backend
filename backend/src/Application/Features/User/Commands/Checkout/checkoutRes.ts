
import { Order } from "../../../../../Database/Entities/order.js";
export const checkoutRes = {
    customize: async (order: Checkout.ICheckoutDeo): Promise<Checkout.ICheckoutResponse> => {
        const response = {
            data: {
                order: order,
                redirectLinePayUrl: order.redirectLinePayUrl? order.redirectLinePayUrl : "",
            },
        };
        return response;
    },
};