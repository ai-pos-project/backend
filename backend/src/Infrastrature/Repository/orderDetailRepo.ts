import { FindManyOptions } from "typeorm";
import { OrderDetail } from "../../Database/Entities/orderDetail.js";

export const orderDetailRepo = {
  findById: async (id: OrderDetail["id"]): Promise<OrderDetail | null> => {
    try {
      const orderDetail = await OrderDetail.findOne({ where: { id: id } });
      return orderDetail;
    } catch (error) {
      console.error("Failed to find order detail by id:");
      throw error;
    }
  },
  findByBarcode: async (barcode: string): Promise<OrderDetail | null> => {
    try {
      const orderDetail = await OrderDetail.findOne({
        where: { barcode: barcode },
      });
      return orderDetail;
    } catch (error) {
      console.error("Failed to find order detail by barcode:");
      throw error;
    }
  },
  findByOrderId: async (orderId: number): Promise<OrderDetail[]> => {
    try {
      const queryRules: FindManyOptions<OrderDetail> = {
        where: { orderId: orderId },
      };
      const orderDetail = await OrderDetail.find(queryRules);
      return orderDetail;
    } catch (error) {
      console.error("Failed to find order detail by orderId:");
      throw error;
    }
  },
  findByOrderIdAndBarcode: async (orderId: number, barcode: string): Promise<OrderDetail | null> => {
    try {
      const orderDetail = await OrderDetail.findOne({
        where: { orderId: orderId, barcode: barcode },
      });
      return orderDetail;
    } catch (error) {
      console.error("Failed to find order detail by orderId and barcode:");
      throw error;
    }
  },
};
