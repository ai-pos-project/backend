import { signUpHandler } from "../Application/Features/Manager/Commands/SignUp/signUpHandler.js";

import { Request, Response } from "express";

import { tool } from "../utils/tool.js";

import { InputEmptyError, InvalidInputError, ManagerNotFoundError, NoTokenError, PhoneFormatError } from "../Errors/error.js";
import { signInHandler } from "../Application/Features/Manager/Commands/SignIn/signInHandler.js";
import { addGoodsHandler } from "../Application/Features/Manager/Commands/AddGoods/addGoodsHandler.js";
import { updateGoodsHandler } from "../Application/Features/Manager/Commands/UpdateGoods/updateGoodsHandler.js";
import { deleteGoodsHandler } from "../Application/Features/Manager/Commands/DeleteGoods/deleteGoodsHandler.js";
import { seachGoodsHandler } from "../Application/Features/Manager/Queries/SearchGood/seachGoodsHandler.js";
import { searchTransactionsHandler } from "../Application/Features/Manager/Queries/SearchTransaction/searchTransactionsHandler.js";
import { confirmPaymentHandler } from "../Application/Features/Manager/Commands/ConfirmPayment/confirmPaymentHandler.js";
import { validateAddOrderReqBody } from "../Application/Features/Manager/Commands/AddOrder/Types/addOrderDto.js";
import { AddOrder } from "../Application/Features/Manager/Commands/AddOrder/Types/api.js";
import { addOrderHandler } from "../Application/Features/Manager/Commands/AddOrder/addOrderHandler.js";
export const managerController = {
  signUp: async (req: Request, res: Response): Promise<void> => {
    const { phone, password } = req.body;
    if (!phone || !password) {
      throw new InputEmptyError();
    }
    if (!(await tool.checkPhoneNumber(phone))) {
      throw new PhoneFormatError();
    }

    const response = await signUpHandler.handle(phone, password);
    if (response) res.status(200).json(response);
  },
  signIn: async (req: Request, res: Response): Promise<void> => {
    const { phone, password } = req.body;
    if (!phone || !password) {
      throw new ManagerNotFoundError();
    }
    const response = await signInHandler.handle(phone, password);
    res.status(200).json(response);
  },
  addGoods: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }

    const { name , stock , price, barcode } = req.body;
    if (!name || !stock || !price || !barcode) {
      throw new InputEmptyError();
    }
    const response = await addGoodsHandler.handle(name, stock, price, barcode);
    res.status(200).json(response);
  },
  updateGoods: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }

    const { name , stock , price, goodId } = req.body;
    if (!name || !stock || !price || !goodId) {
      throw new InputEmptyError();
    }
    const response = await updateGoodsHandler.handle(name, stock, price, goodId);
    res.status(200).json(response);
  },
  seachGoods: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const keywords = req.query.keywords;
    
    if (typeof keywords !== 'string' && typeof keywords !== 'undefined') {
      throw new InvalidInputError('keywords must be a string');
    }
    const response = await seachGoodsHandler.handle(keywords);
    res.status(200).json(response);
  },
  deleteGoods: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { goodId } = req.params;
    if (!goodId) {
      throw new InputEmptyError();
    }
    const response = await deleteGoodsHandler.handle(Number(goodId));
    res.status(200).json(response);
  },
  searchTransactions: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const keywords = req.query.keywords;

    if (typeof keywords !== 'string' && typeof keywords !== 'undefined') {
      throw new InvalidInputError('keywords must be a string');
    }
    const response = await searchTransactionsHandler.handle(keywords);
    res.status(200).json(response);
  },
  confirmPayment: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { orderId,isPaid } = req.body;
    if (!orderId || typeof isPaid !== 'boolean') {
      throw new InputEmptyError();
    }
    const response = await confirmPaymentHandler.handle(Number(orderId), isPaid);
    res.status(200).json(response);
  },
  addOrder: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }

    const validationErrors = await validateAddOrderReqBody(
      req.body,
    );
    if (validationErrors.length > 0) {
      throw new InvalidInputError(validationErrors.join(', '));
    }

    const response = await addOrderHandler.handle(req.body as AddOrder.IAddOrderReqBody);
    res.status(200).json(response);
  },


};
