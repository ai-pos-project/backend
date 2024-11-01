import { GetFilteredMembers } from "./Types/api.js";

export const getMembersRes = {
    customize: async(users: GetFilteredMembers.IGetFilteredMembersDto[]): Promise<GetFilteredMembers.IGetAllGoodsResponse> => {
        const response: GetFilteredMembers.IGetAllGoodsResponse = {
            data: {
                users: users
            }
        };
        return response;
    }
}
       