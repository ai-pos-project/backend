
import { Beya } from "../../../../../Types/common.js";
import { UserSignin } from "./Types/api.js";
export const signInRes = {
    customize: async(user: UserSignin.IUserSignInDto, tokenInfo: Beya.IJwtTokenObject): Promise<UserSignin.IUserSignInResponse> => {
        const response: UserSignin.IUserSignInResponse = {
            data: {
                accessToken: tokenInfo.token,
                accessExpired: tokenInfo.expire,
                user: user
            }
        };
        return response;
    }
}