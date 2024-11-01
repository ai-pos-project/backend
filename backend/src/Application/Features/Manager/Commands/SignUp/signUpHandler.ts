import { tool } from "../../../../../utils/tool.js";
import { auth } from "../../../../../utils/jwt.js";
import { signUpRes } from "./signUpRes.js";
import { managerService } from "../../../../../Infrastrature/Service/managerService.js";

export const signUpHandler = {
    handle: async (phone: string, password: string): Promise<ManagerSignup.ISignUpResponse> => {
        //init
        let response = null;
        const hashedPassword = await tool.generateHashPassword(password);
        const manager = await managerService.signUp(phone, hashedPassword);
        
        const tokenInfo = await auth.generateAccessToken(manager.id);
        
        response = await signUpRes.customize(manager,tokenInfo);
        return response;
    }

}
