import { Request, Response } from "express";
import { InputEmptyError, NoTokenError } from "../Errors/error.js";
import { scanGoodsHandler } from "../Application/Features/Order/Queries/ScanGoods/scanGoodsHandler.js";

export const goodController = {
  scanGoods: async (req: Request, res: Response): Promise<void> => {
    if (req.decodedToken === undefined) {
      throw new NoTokenError();
    }
    const { barcode } = req.params;
    if (!barcode) {
      throw new InputEmptyError();
    }
    const response = await scanGoodsHandler.handle(barcode);
    res.status(200).json(response);
  },
};
