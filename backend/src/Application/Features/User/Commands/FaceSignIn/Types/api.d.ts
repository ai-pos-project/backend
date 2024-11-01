
declare namespace FaceSignin {
    interface IUserDto extends Pick<User, 'id' | 'name'> {
        orderId: number;
    }
    interface IFaceSigninResponse {
        data: {
            user: IUserDto,
            accessToken: string,
            accessExpired: string,
        }
    }
}