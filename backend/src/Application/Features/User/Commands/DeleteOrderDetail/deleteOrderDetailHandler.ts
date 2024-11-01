
import { orderService } from "../../../../../Infrastrature/Service/orderService.js";
import { deleteOrderDetailRes } from "./deleteOrderDetailRes.js";

export const deleteOrderDetailHandler = {
    handle: async (orderDetailId: number): Promise<{message: string}> => {
        await orderService.deleteOrderDetail(orderDetailId);
        return await deleteOrderDetailRes.customize();
    },
};