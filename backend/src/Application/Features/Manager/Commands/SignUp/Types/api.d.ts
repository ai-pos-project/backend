declare namespace ManagerSignup {
    interface IUserDto extends Pick<User, "id" | "phone"> {
    }
    interface ISignUpResponse {
        data: {
            accessToken: string,
            accessExpired: string,
            user: IUserDto
        }
    }
    
}
