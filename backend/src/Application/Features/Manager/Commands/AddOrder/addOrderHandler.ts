
import { managerService } from '../../../../../Infrastrature/Service/managerService.js';
import { addOrderRes } from './addOrderRes.js';
import { AddOrder } from './Types/api.js';

export const addOrderHandler = {
    handle: async (body: AddOrder.IAddOrderReqBody): Promise<AddOrder.IAddOrderResponse> => {
        await managerService.addOrder(body);
        const response = await addOrderRes.customize();
        return response;
    }
}