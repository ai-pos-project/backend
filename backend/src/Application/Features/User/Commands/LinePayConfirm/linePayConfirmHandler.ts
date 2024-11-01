
import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { linePayConfirmRes } from "./linePayConfirmRes.js";

export const linePayConfirmHandler = {
    handle: async (orderId: number, transactionId: string, total: number): Promise<{ data: { message: string } }> => {
        await userService.confirmLinePay(orderId, transactionId, total);
        const response = await linePayConfirmRes.customize();
        return response;
    }
}