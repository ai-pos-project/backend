declare namespace UserSignup {
    interface IUserDto extends Pick<User, "id" | "name" | "identity"> {
    }
    interface ISignUpResponse {
        data: {
            accessToken: string,
            accessExpired: string,
            user: IUserDto
        }
    }
}
