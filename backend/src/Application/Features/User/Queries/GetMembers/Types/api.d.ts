import { User } from "../../../../../../Database/Entities/user.ts"

declare namespace GetFilteredMembers {
    interface IGetFilteredMembersDto extends Pick<User, "id" | "name" | "phone"> {
    }
    interface IGetAllGoodsResponse {
        data: {
            users: IGetFilteredMembersDto[]
        }
    }
    
}
