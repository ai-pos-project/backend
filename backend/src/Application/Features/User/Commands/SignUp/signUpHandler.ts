
import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { auth } from "../../../../../utils/jwt.js";
import { signUpRes } from "./signUpRes.js";

export const signUpHandler = {
    handle: async (name: string): Promise<UserSignup.ISignUpResponse> => {
        const user = await userService.signUp(name);
        const tokenInfo = await auth.generateAccessToken(user.id);
        const response = await signUpRes.customize(user,tokenInfo);
        return response;
    }
}