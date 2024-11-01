import { userService } from "../../../../../Infrastrature/Service/userService.js";
import { faceSignUpRes } from "./faceSignUpRes.js";
export const faceSignUpHandler = {
  handle: async (
    name: string,
    phone: string,
  ): Promise<FaceSignup.IFaceSignupResponse> => {

    const result = await userService.faceSignUp(name, phone);
    const response = await faceSignUpRes.customize(result);
    return response;
  },
};
