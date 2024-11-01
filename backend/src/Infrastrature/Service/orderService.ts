import { AddToCart } from "../../Application/Features/Order/Commands/AddToCart/Types/api.js";
import { Database } from "../../Database/data-source.js";
import { OrderDetail } from "../../Database/Entities/orderDetail.js";
import { orderDetailRepo } from "../Repository/orderDetailRepo.js";
import { orderRepo } from "../Repository/orderRepo.js";


export const orderService = {
    addToCart: async (body: AddToCart.PatchUserInfoReqBody): Promise<void> => {
        const { name, price, barcode, orderId } = body;
        const order = await orderRepo.findById(orderId);
        if (order === null) {
            throw new Error("Order should be exist");
        }
        // 
        let orderDetail = await orderDetailRepo.findByOrderIdAndBarcode(orderId, barcode);

        return Database.transaction(async (transactionManager) => {
            if( orderDetail === null) {
                orderDetail = new OrderDetail();
                orderDetail.name = name;
                orderDetail.barcode = barcode;
                orderDetail.quantity = 1; 
                orderDetail.subtotal = price;
                orderDetail.orderId = order.id;
                await transactionManager.save(orderDetail);
            }else {
                orderDetail.quantity += 1;
                orderDetail.subtotal += price;
                await transactionManager.save(orderDetail);
            }
        });

    },
    updateOrderDetail: async (orderDetailId: number, quantity: number): Promise<void> => {
        const orderDetail = await orderDetailRepo.findById(orderDetailId);
        if (orderDetail === null) {
            throw new Error("Order detail should be exist");
        }
        orderDetail.subtotal = (orderDetail.subtotal / orderDetail.quantity) * quantity;
        orderDetail.quantity = quantity;
        await orderDetail.save();
    },
    deleteOrderDetail: async (orderDetailId: number): Promise<void> => {
        const orderDetail = await orderDetailRepo.findById(orderDetailId);
        if (orderDetail === null) {
            throw new Error("Order detail should be exist");
        }
        await orderDetail.remove();
    }
}