
import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { auth } from "../../../../../utils/jwt.js";
import { signInRes } from "./signInRes.js";
import { UserSignin } from "./Types/api.js";

export const signInHandler = {
    handle: async (name: string): Promise<UserSignin.IUserSignInResponse> => {
        const result = await userService.signIn(name);
        const tokenInfo = await auth.generateAccessToken(result.id);
        const response = await signInRes.customize(result,tokenInfo);
        return response;
    }
}