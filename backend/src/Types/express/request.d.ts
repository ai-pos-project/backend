import { Beya } from '../common.js';

declare module 'express-serve-static-core' {
  interface Request {
    decodedToken?: Beya.TJwtTokenPayload;
    file?: Multer.File;
  }
}
