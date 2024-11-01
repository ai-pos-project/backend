import { User } from '../../../../../../Database/Entities/user.js';
declare namespace UserSignin {
  interface IUserSignInDto extends Pick<User, 'id' | 'name'> {
    orderId: number;
  }

  interface IUserSignInResponse {
    data: {
      accessToken: string;
      accessExpired: string;
      user: IUserSignInDto;
    };
  }
}
