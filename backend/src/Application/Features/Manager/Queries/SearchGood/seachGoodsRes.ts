
import { SearchGoods } from './Types/api.js';
export const seachGoodsRes = {
    customize: async(goods: SearchGoods.ISearchGoodsDto[]): Promise<SearchGoods.ISearchGoodsResponse> => {
        const response: SearchGoods.ISearchGoodsResponse = {
            data: {
                goods: goods
            }
        };
        return response;
    }
}