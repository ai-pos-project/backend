import { WrongPasswordError } from '../../../../../Errors/error.js';
import { managerService } from '../../../../../Infrastrature/Service/managerService.js';
import { auth } from '../../../../../utils/jwt.js';
import { tool } from '../../../../../utils/tool.js';
import { signInRes } from './signInRes.js';
import { Signin } from './Types/api.js';

export const signInHandler = {
  handle: async (
    phone: string,
    password: string
  ): Promise<Signin.ISignInResponse> => {

    const result = await managerService.signIn(phone);

    if (!(await tool.confirmPassword(password, result.password as string)))
      throw new WrongPasswordError();

    const tokenInfo = await auth.generateAccessToken(result.id);
    return await signInRes.customize(result, tokenInfo);
  },
};
