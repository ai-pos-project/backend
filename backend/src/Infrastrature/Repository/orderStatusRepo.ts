
import { EntityManager } from "typeorm";
import { OrderStatus } from "../../Database/Entities/orderStatus.js";
export const orderStatusRepo = {
    insertNewOrderStatus: async (orderId: number,isPaid: boolean, paymentMethod: string, transactionManager: EntityManager): Promise<void> => {
        try {
            const newOrderStatus = new OrderStatus();
            newOrderStatus.isPaid = isPaid;
            newOrderStatus.paymentMethod = paymentMethod;
            newOrderStatus.orderId = orderId;
            await transactionManager.save(newOrderStatus);
        } catch (error) {
            console.error("Failed to insert new order status:");
            throw error;
        }
    },
    updateStatus: async (orderId: number, isPaid: boolean): Promise<void> => {
        try {
            const orderStatus = await OrderStatus.findOne({ where: { orderId: orderId } });
            if (orderStatus === null) {
                throw new Error("Order status should be exist");
            }
            orderStatus.isPaid = isPaid;
            await orderStatus.save();
        } catch (error) {
            console.error("Failed to init footprint:");
            throw error;
        }
    },
}