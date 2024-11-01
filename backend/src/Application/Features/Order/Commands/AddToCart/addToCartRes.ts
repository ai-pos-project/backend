
import { AddToCart } from "./Types/api.js";

export const addToCartRes = {
    customize: async (): Promise<AddToCart.IAddToCartResponse> => {
        return {
            data: {
                message: "成功加入購物車"
            }
        };
    }
}