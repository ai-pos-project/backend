import { userService } from "../../../../../Infrastrature/Service/userService.js";
import axios from "axios";
import FormData from "form-data";
import { faceSignInRes } from "./faceSignInRes.js";
import { FaceNotRecognizedError } from "../../../../../Errors/error.js";
import { auth } from "../../../../../utils/jwt.js";

// export const faceSignInHandler = {
//   handle: async (
//     image: Express.Multer.File
//   ): Promise<FaceSignin.IFaceSigninResponse> => {
//     const formData = new FormData();
//     formData.append("image", image.buffer, {
//       filename: image.originalname,
//       contentType: image.mimetype,
//     });
//     const modelRes = await axios.post(
//       `http://${process.env.FACE_MODEL_HOST}:${process.env.FACE_MODEL_PORT}/face/recognize_and_get_result`,
//       formData,
//       {
//         headers: formData.getHeaders(),
//       }
//     );
//     // const modelRes = await axios.get(
//     //   `http://${process.env.FACE_MODEL_HOST}:${process.env.FACE_MODEL_PORT}/face/recognize_and_get_result`
//     // );
//     // const modelRes = await fetch(
//     //   `http://${process.env.FACE_MODEL_HOST}:${process.env.FACE_MODEL_PORT}/face/recognize_and_get_result`,
//     //   {
//     //     method: "GET",
//     //     headers: { "Content-Type": "application/json" },
//     //   }
//     // );
//     if (modelRes.status !== 200) {
//       throw new Error(
//         `Face recognition service returned status ${modelRes.status}`
//       );
//     }
//     const recognizedName = modelRes.data.name;
//     if (recognizedName === "未知") {
//       throw new FaceNotRecognizedError();
//     }
//     console.log(recognizedName);
//     const result = await userService.faceSignIn(recognizedName);
//     const response = await faceSignInRes.customize(result);
//     return response;
//   },
// };
export const faceSignInHandler = {
  handle: async (
    recognizedPhone: string
  ): Promise<FaceSignin.IFaceSigninResponse> => {
    
    
    const result = await userService.faceSignIn(recognizedPhone);
    const tokenInfo = await auth.generateAccessToken(result.id);
    const response = await faceSignInRes.customize(result,tokenInfo);
    return response;
  },
};
