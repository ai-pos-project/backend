
import { managerService } from '../../../../../Infrastrature/Service/managerService.js';
import { seachGoodsRes } from './seachGoodsRes.js';
import { SearchGoods } from './Types/api.js';

export const seachGoodsHandler = {
    handle: async (name: string | undefined): Promise<SearchGoods.ISearchGoodsResponse> => {
        const goods = await managerService.searchGoods(name);
        const response = await seachGoodsRes.customize(goods);
        return response;
    }
}