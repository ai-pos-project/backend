export const faceSignUpRes = {
    customize: async (result: FaceSignup.IUserDto): Promise<FaceSignup.IFaceSignupResponse> => {
        return {
            data: {
                user: result
            }
        };
    },
};