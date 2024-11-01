import express from 'express';
import { managerController } from '../Controller/managerController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { jwtAuthentication } from '../Middleware/auth.js';
const router = express.Router();

router.get('/searchGoods', jwtAuthentication,wrapAsync(managerController.seachGoods));
router.get('/transactions', jwtAuthentication,wrapAsync(managerController.searchTransactions));

router.post('/signup', wrapAsync(managerController.signUp));
router.post('/signin', wrapAsync(managerController.signIn));
router.post('/addGoods', jwtAuthentication,wrapAsync(managerController.addGoods));
router.put('/updateGoods', jwtAuthentication,wrapAsync(managerController.updateGoods));
router.delete('/deleteGoods/:goodId', jwtAuthentication,wrapAsync(managerController.deleteGoods));
router.put('/confirmPayment', jwtAuthentication,wrapAsync(managerController.confirmPayment));
router.post('/addOrder', jwtAuthentication,wrapAsync(managerController.addOrder));
export default router;