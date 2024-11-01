export const updateGoodsRes = {
  customize: async (): Promise<{
    message: string;
  }> => {
    return {
      message: "Goods updated successfully",
    };
  },
};
