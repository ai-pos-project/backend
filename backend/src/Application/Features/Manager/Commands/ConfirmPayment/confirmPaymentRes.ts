

export const confirmPaymentRes = {
    customize: async(): Promise<ConfirmPayment.IConfirmPaymentResponse> => {
        const response: ConfirmPayment.IConfirmPaymentResponse = {
            data: {
                message: 'Payment confirmed'
            }
        };
        return response;
    }
}