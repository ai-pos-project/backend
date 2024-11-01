import { AddOrder } from "./Types/api.js";

export const addOrderRes = {
    customize: async(): Promise<AddOrder.IAddOrderResponse> => {
        const response: AddOrder.IAddOrderResponse = {
            data: {
                message: 'Order added'
            }
        };
        return response;
    }
}