import { Request, Response } from "express";
import { InputEmptyError, InvalidInputError, NoTokenError } from "../Errors/error.js";
import { getMembersHandler } from "../Application/Features/User/Queries/GetMembers/getMembersHandler.js";

import { validateAddToCartReqBody } from "../Application/Features/Order/Commands/AddToCart/Types/addToCartDto.js";
import { AddToCart } from "../Application/Features/Order/Commands/AddToCart/Types/api.js";
import { addToCartHandler } from "../Application/Features/Order/Commands/AddToCart/addToCartHandler.js";
import { getCartItemsHandler } from "../Application/Features/User/Queries/GetCartItems/getCartItemsHandler.js";
import { updateOrderDetailHandler } from "../Application/Features/User/Commands/UpdateOrderDetail/updateOrderDetailHandler.js";
import { deleteOrderDetailHandler } from "../Application/Features/User/Commands/DeleteOrderDetail/deleteOrderDetailHandler.js";
import { nativePayments } from "../Types/paymentWay.js";
import { checkoutHandler } from "../Application/Features/User/Commands/Checkout/checkoutHandler.js";
import { signUpHandler } from "../Application/Features/User/Commands/SignUp/signUpHandler.js";
import { signInHandler } from "../Application/Features/User/Commands/SignIn/signInHandler.js";
import { faceSignUpHandler } from "../Application/Features/User/Commands/FaceSignUp/faceSignUpHandler.js";
import { faceSignInHandler } from "../Application/Features/User/Commands/FaceSignIn/faceSignInHandler.js";
import { linePayConfirmHandler } from "../Application/Features/User/Commands/LinePayConfirm/linePayConfirmHandler.js";


export const userController = {
  faceSignUp: async (req: Request, res: Response): Promise<void> => {
    const { name, phone } = req.body;
    if (!name || !phone) {
      throw new InputEmptyError();
    }
    const response = await faceSignUpHandler.handle(name, phone);
    res.status(200).json(response);
  },
  faceSignIn: async (req: Request, res: Response): Promise<void> => {
    // const image = req.file; // 假設使用 multer 中間件來處理檔案上傳
    // if (!image) {
    //   throw new Error("No image uploaded");
    // }
    const response = await faceSignInHandler.handle();
    res.status(200).json(response);
  },
  signUp: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    if (!name) {
      throw new InputEmptyError();
    }
    const response = await signUpHandler.handle(name);
    res.status(200).json(response);
  },
  // signIn: async (req: Request, res: Response): Promise<void> => {
  //   const { phone, password } = req.body;
  //   if (!phone || !password) {
  //     throw new InputEmptyError();
  //   }
  //   const response = await signInHandler.handle(phone, password);
  //   res.status(200).json(response);
  // },
  signIn: async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    if (!name) {
      throw new InputEmptyError();
    }
    const response = await signInHandler.handle(name);
    res.status(200).json(response);
  },
  getMembers: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const keywords = req.query.keywords;
    
    if (typeof keywords !== 'string' && typeof keywords !== 'undefined') {
      throw new InvalidInputError('keywords must be a string');
    }

    const response = await getMembersHandler.handle(keywords);
    res.status(200).json(response);
  },
  addToCart: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const validationErrors = await validateAddToCartReqBody(
      req.body,
    );
    if (validationErrors.length > 0) {
      throw new InvalidInputError(validationErrors.join(', '));
    }
    
    const response = await addToCartHandler.handle(req.body as AddToCart.PatchUserInfoReqBody);
    res.status(200).json(response);
  },
  getCartItems: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { orderId } = req.params;
    if (!orderId) {
      throw new InputEmptyError();
    }
    const response = await getCartItemsHandler.handle(Number(orderId));
    res.status(200).json(response);
  },
  updateOrderDetail: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    // 直接取代原先的值
    const { orderDetailId, quantity } = req.body;
    if (!orderDetailId || !quantity) {
      throw new InputEmptyError();
    }
    const response = await updateOrderDetailHandler.handle(Number(orderDetailId), quantity);
    res.status(200).json(response);
  },
  deleteOrderDetail: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { orderDetailId } = req.params;
    if (!orderDetailId) {
      throw new InputEmptyError();
    }
    const response = await deleteOrderDetailHandler.handle(Number(orderDetailId));
    res.status(200).json(response);
  },
  checkout: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { orderId, paymentMethod , total} = req.body;
    if (!orderId) {
      throw new InputEmptyError();
    }
    if( !paymentMethod && nativePayments.includes(paymentMethod) === false) {
      throw new InputEmptyError();
    }
    const response = await checkoutHandler.handle(Number(orderId),paymentMethod, total);
    res.status(200).json(response);
  },
  linePay: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { orderId, transactionId ,total} = req.body;
    if (!orderId || !transactionId || typeof total !== 'number') {
      throw new InputEmptyError();
    }

    const response = await linePayConfirmHandler.handle(Number(orderId), transactionId,total);
    res.status(200).json(response);
  },
};
