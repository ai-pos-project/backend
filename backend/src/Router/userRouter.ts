import express from 'express';
import { userController } from '../Controller/userController.js';
import wrapAsync from '../utils/wrapAsync.js';
import { jwtAuthentication } from '../Middleware/auth.js';
const router = express.Router();

router.post('/faceSignup', wrapAsync(userController.faceSignUp));
router.post('/faceSignIn', wrapAsync(userController.faceSignIn));

router.post('/signup', wrapAsync(userController.signUp));
router.post('/signin', wrapAsync(userController.signIn));
router.get('/members', jwtAuthentication,wrapAsync(userController.getMembers));

router.post('/shoppingCart', jwtAuthentication, wrapAsync(userController.addToCart));
router.get('/shoppingCart/:orderId', jwtAuthentication, wrapAsync(userController.getCartItems));
router.patch('/orderDetail', jwtAuthentication, wrapAsync(userController.updateOrderDetail));
router.delete('/orderDetail/:orderDetailId', jwtAuthentication, wrapAsync(userController.deleteOrderDetail));

router.post('/checkout', jwtAuthentication, wrapAsync(userController.checkout));
router.post('/linePayConfirm', jwtAuthentication,wrapAsync(userController.linePay));
export default router;