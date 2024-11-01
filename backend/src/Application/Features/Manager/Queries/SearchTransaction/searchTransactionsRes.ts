
import { SearchTransactions } from './Types/api.js';
export const searchTransactionsRes = {
    customize: async(transactions: SearchTransactions.ISearchTransactionsDto[]): Promise<SearchTransactions.ISearchTransactionsResponse> => {
        const response: SearchTransactions.ISearchTransactionsResponse = {
            data: {
                orders: transactions
            }
        };
        return response;
    }
}