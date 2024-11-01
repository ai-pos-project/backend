import { Good } from "../../../../../../Database/Entities/good.ts"

declare namespace SearchGoods {
    interface ISearchGoodsDto extends Pick<Good, "id" | "name" | "stock" | "price" | "barcode"> {
    }
    interface ISearchGoodsResponse {
        data: {
            goods: ISearchGoodsDto[]
        }
    }
    
}
