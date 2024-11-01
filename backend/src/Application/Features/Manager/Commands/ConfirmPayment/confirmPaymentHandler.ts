
import { managerService } from '../../../../../Infrastrature/Service/managerService.js';
import { confirmPaymentRes } from './confirmPaymentRes.js';


export const confirmPaymentHandler = {
    handle: async (orderId: number, isPaid: boolean): Promise<ConfirmPayment.IConfirmPaymentResponse> => {
        await managerService.confirmPayment(orderId,isPaid);
        const response = await confirmPaymentRes.customize();
        return response;
    }
}