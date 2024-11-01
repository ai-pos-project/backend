import { User } from "../../../../../../Database/Entities/user.ts"

declare namespace SearchTransactions {
    interface IOrderDetailDto extends Pick<OrderDetail, "name" | "quantity" | "subtotal"> {
    }
    interface IOrderStatusDto extends Pick<OrderStatus, "isPaid" | "paymentMethod"> {
    }
    interface ISearchTransactionsDto extends Pick<User, "name">, Pick<Order, "id" | "total" | "createdAt"> {
        orderDetail: IOrderDetailDto[];
        orderStatus: IOrderStatusDto;
    }
    
    interface ISearchTransactionsResponse {
        data: {
            orders: ISearchTransactionsDto[]
        }
    }
    
}