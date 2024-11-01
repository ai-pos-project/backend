import { Beya } from "../../../../../Types/common.js";

export const signUpRes = {
    customize: async(user: UserSignup.IUserDto, tokenInfo: Beya.IJwtTokenObject): Promise<UserSignup.ISignUpResponse> => {
        const response: UserSignup.ISignUpResponse = {
            data: {
                accessToken: tokenInfo.token,
                accessExpired: tokenInfo.expire,
                user: user
            }
        };
        return response;
    }
}