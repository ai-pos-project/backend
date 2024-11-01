import { User } from '../../../../../../Database/Entities/user.js';
declare namespace Signin {
  interface ISignInDto extends Pick<User, 'id'> {
    password?: string | null;
  }

  interface ISignInResponse {
    data: {
      accessToken: string;
      accessExpired: string;
      user: ISignInDto;
    };
  }
}
