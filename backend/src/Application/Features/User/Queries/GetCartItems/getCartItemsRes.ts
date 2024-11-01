
import { GetCartItems } from "./Types/api.js";

export const getCartItemsRes = {
    customize: async (cartItems: GetCartItems.IGetCartItemsDto[]): Promise<GetCartItems.IGetCartItemsResponse> => {
        const response = {
            data: {
                cartItems: cartItems,
            },
        };
        return response;
    },
};