import env from "../../config/env";
import jwt from "jsonwebtoken";

export interface ITokenPayload {
  id: string;
  email: string;
  role: string;
  name:string
  roleLevel:number
}

class TokenService {
  static sign(payload: ITokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.TOKEN_EXPIRES_IN,
    });
  }

  static verify(token: string): ITokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as ITokenPayload;
  }
}

export default TokenService;
