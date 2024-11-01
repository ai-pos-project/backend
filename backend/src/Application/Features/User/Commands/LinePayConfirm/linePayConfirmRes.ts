

export const linePayConfirmRes = {
    customize: async(): Promise<{ data: { message: string } }> => {
        const response = {
            data: {
                message: 'Payment confirmed'
            }
        };
        return response;
    }
}