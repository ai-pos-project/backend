
import express from 'express';
import { goodController } from '../Controller/goodController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { jwtAuthentication } from '../Middleware/auth.js';

const router = express.Router();

router.get('/scanGoods/:barcode', jwtAuthentication,wrapAsync(goodController.scanGoods));

export default router;