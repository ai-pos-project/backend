import { Beya } from "../../../../../Types/common.js";

export const faceSignInRes = {
    customize: async (result: FaceSignin.IUserDto, tokenInfo: Beya.IJwtTokenObject): Promise<FaceSignin.IFaceSigninResponse> => {
        return {
            data: {
                user: result,
                accessToken: tokenInfo.token,
                accessExpired: tokenInfo.expire,
            }
        };
    },
};