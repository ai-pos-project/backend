

export const deleteOrderDetailRes = {
    customize: async (): Promise<{message: string}> => {
        return {
            message: "Order detail deleted successfully",
        };
    },
};