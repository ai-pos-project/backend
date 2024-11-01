import jwt from "jsonwebtoken";
import { Beya } from "../Types/common.js";
type JwtPayload = {
  id: number;
};

export function isTJwtTokenPayload(
    obj: unknown,
  ): obj is Beya.TJwtTokenPayload {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      'id' in obj &&
      'exp' in obj &&
      'iat' in obj &&
      typeof obj.id === 'number' &&
      typeof obj.exp === 'number' &&
      typeof obj.iat === 'number'
    );
  }
  export const auth = {
    generateAccessToken: async (
      userId: number,
    ): Promise<Beya.IJwtTokenObject> => {
      const secretKey = process.env.JWT_SECRET as string;
      const payload: JwtPayload = { id: userId };
      const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
      const tokenInfo: Beya.IJwtTokenObject = {
        token: token,
        expire: `${60 * 60 * 24}`,
      };
      return tokenInfo;
    },
  };