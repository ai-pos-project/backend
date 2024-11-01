
import { managerService } from '../../../../../Infrastrature/Service/managerService.js';
import { searchTransactionsRes } from './searchTransactionsRes.js';
import { SearchTransactions } from './Types/api.js';


export const searchTransactionsHandler = {
    handle: async (keyword: string | undefined): Promise<SearchTransactions.ISearchTransactionsResponse> => {
        const transactions = await managerService.searchTransactions(keyword);
       
        const response = await searchTransactionsRes.customize(transactions);
        return response;
    }
}