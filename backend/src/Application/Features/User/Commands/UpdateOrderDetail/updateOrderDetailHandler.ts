import { orderService } from "../../../../../Infrastrature/Service/orderService.js";
import { updateOrderDetailRes } from "./updateOrderDetailRes.js";

export const updateOrderDetailHandler = {
    handle: async (orderDetailId: number, quantity: number): Promise<{message: string}> => {
        await orderService.updateOrderDetail(orderDetailId, quantity);
        return await updateOrderDetailRes.customize();

    },
};