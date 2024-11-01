export const deleteGoodsRes = {
    customize: async (): Promise<{
      message: string;
    }> => {
      return {
        message: 'Goods deleted successfully',
      };
    },
  };
  