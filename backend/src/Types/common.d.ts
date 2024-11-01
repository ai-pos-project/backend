import { JwtPayload } from 'jsonwebtoken';

declare namespace Beya {
  type TJwtTokenPayload = JwtPayload & {
    id: number;
  };

  interface IJwtTokenObject {
    token: string;
    expire: string;
  }
  interface ILinePayReqHeader {
    [key: string]: string;
  }
}
