import { Good } from "../../../../../../Database/Entities/good.ts"

declare namespace ScanGoods {
    interface IScanGoodDto extends Pick<Good,"name" | "price" | "barcode"> {
    }
    interface IScanGoodResponse {
        data: {
            good: IScanGoodDto
        }
    }
    
}
