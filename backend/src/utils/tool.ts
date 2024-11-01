import bcrypt from "bcrypt";
import multer from "multer";
import { Beya } from "../Types/common.js";
import * as crypto from "crypto";

export const tool = {
  uploadPicture: () => {
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    });
    return upload;
  },
  generateHashPassword: async (password: string): Promise<string> => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error("hash problem: " + error);
    }
  },
  checkPhoneNumber: async (phoneNumber: string): Promise<boolean> => {
    const taiwanMobileRegex = /^09\d{8}$/;
    const taiwanLandlineRegex = /^0\d{1,2}\d{6,8}$/;
    return (
      taiwanMobileRegex.test(phoneNumber) ||
      taiwanLandlineRegex.test(phoneNumber)
    );
  },
  confirmPassword: async (input: string, real: string): Promise<boolean> => {
    try {
      return await bcrypt.compare(input, real);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false;
    }
  },
  createSignature:  async (
    uri: string,
    body: Checkout.TLinePayBody
  ): Promise<Beya.ILinePayReqHeader> => {
    const nonce = Math.floor(Date.now() / 1000);
    const string = `${process.env.LINEPAY_CHANNEL_SECRET_KEY}/${
      process.env.LINEPAY_VERSION
    }${uri}${JSON.stringify(body)}${nonce}`;
    const hmac = crypto.createHmac("sha256", process.env.LINEPAY_CHANNEL_SECRET_KEY as string);
    hmac.update(string);
    const signature = hmac.digest("base64");
    const headers = {
      'X-Line-ChannelId': process.env.LINEPAY_CHANNEL_ID as string,
      'Content-Type': "application/json",
      'X-LINE-Authorization-Nonce': nonce.toString(),
      'X-LINE-Authorization': signature,
    };
    return headers;
  },
};
