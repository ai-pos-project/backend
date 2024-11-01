import { Signin } from './Types/api.js';
import { Beya } from '../../../../../Types/common.js';

export const signInRes = {
  customize: async (
    result: Signin.ISignInDto,
    accessTokenInfoObj: Beya.IJwtTokenObject,
  ): Promise<Signin.ISignInResponse> => {
    const response: Signin.ISignInResponse = {
      data: {
        accessToken: accessTokenInfoObj.token,
        accessExpired: accessTokenInfoObj.expire,
        user: {
          id: result.id
        },
      },
    };
    return response;
  },
};
