import { OrderDetail } from "../../../../../../Database/Entities/orderDetail.ts";

export namespace GetCartItems {
  export interface IGetCartItemsResponse {
    data: {
      cartItems: IGetCartItemsDto[];
    };
  }

  interface IGetCartItemsDto
    extends Pick<OrderDetail, "id" | "name" | "quantity" | "subtotal" | "barcode"> {

    }
}
