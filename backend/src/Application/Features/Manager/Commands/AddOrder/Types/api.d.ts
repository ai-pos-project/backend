import { OrderStatus } from "../../../../../../Database/Entities/orderStatus.ts";
import { User } from "../../../../../../Database/Entities/user.ts";

declare namespace AddOrder {
    type OrderDetailDto = {
        name: string;
        quantity: number;
        price: number;
    }
    interface IAddOrderReqBody extends Pick<User, "name">, Pick<Order, "total">,Pick<OrderStatus, "paymentMethod" | "isPaid"> {
        orderDetails: OrderDetailDto[];
    }
    interface IAddOrderResponse {
        data: {
            message: string;
        }
    }

}