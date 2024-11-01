import { OrderDetail } from "../../../../../../Database/Entities/orderDetail.ts";

declare namespace AddToCart {
  type PatchUserInfoReqBody = 
    Pick<
      OrderDetail,
      | 'name'
      | 'barcode'
      | 'orderId'
    > & {
    price: number;
  };
  interface IAddToCartResponse {
    data: {
        message: string;
    }
  }
}
