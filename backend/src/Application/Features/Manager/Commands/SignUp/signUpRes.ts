import { Beya } from '../../../../../Types/common.js';
export const signUpRes = {
    customize: async(newUser: ManagerSignup.IUserDto ,accessTokenInfoObj: Beya.IJwtTokenObject): Promise<ManagerSignup.ISignUpResponse> => { 
        const response: ManagerSignup.ISignUpResponse = {
            data: {
                accessToken: accessTokenInfoObj.token,
                accessExpired: accessTokenInfoObj.expire,
                user: {
                    id: newUser.id,
                    phone: newUser.phone,
                }
            }
        };
        return response;
    }
}