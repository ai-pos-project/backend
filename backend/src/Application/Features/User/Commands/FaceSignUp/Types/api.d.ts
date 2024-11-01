
declare namespace FaceSignup {
    interface IUserDto extends Pick<User, 'id' | 'name' | 'phone'> {
    }
    interface IFaceSignupResponse {
        data: {
            user: IUserDto
        }
    }
}