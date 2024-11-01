import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { getMembersRes } from "./getMembersRes.js";
import { GetFilteredMembers } from "./Types/api.js";



export const getMembersHandler = {
  handle: async (name: string | undefined): Promise<GetFilteredMembers.IGetAllGoodsResponse> => {
    const users = await userService.getFilteredMembers(name);

    const response = await getMembersRes.customize(users);
    return response;
  },
};
