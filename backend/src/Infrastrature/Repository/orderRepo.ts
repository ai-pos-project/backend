import { Order } from "../../Database/Entities/order.js";
export const orderRepo = {
  findById: async (id: Order["id"]): Promise<Order | null> => {
    try {
      const order = await Order.findOne({ where: { id: id } });
      return order;
    } catch (error) {
      console.error("Failed to init footprint:");
      throw error;
    }
  },
};
