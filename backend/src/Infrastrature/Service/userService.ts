import axios from "axios";
import { UserSignin } from "../../Application/Features/User/Commands/SignIn/Types/api.js";
import { GetCartItems } from "../../Application/Features/User/Queries/GetCartItems/Types/api.js";
import { GetFilteredMembers } from "../../Application/Features/User/Queries/GetMembers/Types/api.js";
import { Database } from "../../Database/data-source.js";
import { Order } from "../../Database/Entities/order.js";
import { OrderStatus } from "../../Database/Entities/orderStatus.js";
import { User } from "../../Database/Entities/user.js";
import { UserExistsError, UserNotFoundError } from "../../Errors/error.js";
import { tool } from "../../utils/tool.js";
import { goodsRepo } from "../Repository/goodsRepo.js";
import { orderDetailRepo } from "../Repository/orderDetailRepo.js";
import { orderRepo } from "../Repository/orderRepo.js";
import { orderStatusRepo } from "../Repository/orderStatusRepo.js";
import { userRepo } from "../Repository/userRepo.js";

export const userService = {
  signUp: async (name: string): Promise<UserSignup.IUserDto> => {
    const checkUserExist = await userRepo.findOneByName(name);
    if (checkUserExist != null) throw new UserExistsError();
    // transaction begin
    const result = await Database.transaction(async (transactionManager) => {
      try {
        const newUser = await userRepo.insertNewUserByName(
          name,
          transactionManager
        );

        return {
          id: newUser.id,
          name: newUser.name,
          identity: newUser.identity,
        };
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });
    return result;
  },
  faceSignUp: async (
    name: string,
    phone: string
  ): Promise<FaceSignup.IUserDto> => {
    const result = await Database.transaction(async (transactionManager) => {
      try {
        const newUser = new User();
        newUser.name = name;
        newUser.phone = phone;
        newUser.identity = "customer";
        await transactionManager.save(newUser);

        const response: FaceSignup.IUserDto = {
          id: newUser.id,
          name: newUser.name,
          phone: newUser.phone,
        };
        return response;
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });
    return result;
  },
  signIn: async (name: string): Promise<UserSignin.IUserSignInDto> => {
    const checkUserExist = await userRepo.findOneByName(name);
    if (!checkUserExist) {
      throw new UserNotFoundError();
    }

    // transaction begin
    const result = await Database.transaction(async (transactionManager) => {
      try {
        const order = new Order();
        order.userId = checkUserExist.id;
        await transactionManager.save(order);

        await orderStatusRepo.insertNewOrderStatus(
          order.id,
          false,
          "init",
          transactionManager
        );
        return order.id;
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });

    return {
      id: checkUserExist.id,
      name: checkUserExist.name,
      orderId: result,
    };
  },
  faceSignIn: async (name: string): Promise<FaceSignin.IUserDto> => {
    const checkUserExist = await userRepo.findByPhone(name);
    if (!checkUserExist) {
      throw new UserNotFoundError();
    }

    // transaction begin
    const result = await Database.transaction(async (transactionManager) => {
      try {
        const order = new Order();
        order.userId = checkUserExist.id;
        await transactionManager.save(order);

        await orderStatusRepo.insertNewOrderStatus(
          order.id,
          false,
          "init",
          transactionManager
        );
        return order.id;
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });
    return {
      id: checkUserExist.id,
      name: checkUserExist.name,
      orderId: result,
    };
  },
  getFilteredMembers: async (
    name: string | undefined
  ): Promise<GetFilteredMembers.IGetFilteredMembersDto[]> => {
    if (!name) {
      const user = await userRepo.findAllExceptManager();
      const userDto = user.map((user: User) => {
        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
        };
      });
      return userDto;
    }
    const user = await userRepo.findByName(name);
    const userDto = user.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
      };
    });
    return userDto;
  },
  getCartItems: async (
    orderId: number
  ): Promise<GetCartItems.IGetCartItemsDto[]> => {
    const cartItems = await orderDetailRepo.findByOrderId(orderId);

    return cartItems.map((cartItem) => {
      return {
        id: cartItem.id,
        name: cartItem.name,
        quantity: cartItem.quantity,
        subtotal: cartItem.subtotal,
        barcode: cartItem.barcode,
      } as GetCartItems.IGetCartItemsDto;
    });
  },
  checkouByDelay: async (
    orderId: number,
    total: number
  ): Promise<Checkout.ICheckoutDeo> => {
    const order = await orderRepo.findById(orderId);
    if (!order) {
      throw new Error("Order should be exist");
    }
    return Database.transaction(async (transactionManager) => {
      try {
        const orderStatus = await OrderStatus.findOne({
          where: { orderId: orderId },
        });
        if (!orderStatus) {
          throw new Error("Order status should be exist");
        }
        orderStatus.paymentMethod = "delay";
        order.total = total;
        await transactionManager.save(order);
        await transactionManager.save(orderStatus);

        const orderDetails = await orderDetailRepo.findByOrderId(orderId);
        const updatePromises = orderDetails.map(async (orderDetail) => {
          const good = await goodsRepo.findByBarcode(orderDetail.barcode);

          if (good) {
            good.stock -= orderDetail.quantity;
            return transactionManager.save(good);
          } else {
            throw new Error(
              `Goods with barcode ${orderDetail.barcode} not found, contact the admin`
            );
          }
        });
        await Promise.all(updatePromises);

        return {
          order: order,
        };
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });
  },
  checkoutByLine: async (
    orderId: number,
    total: number
  ): Promise<Checkout.ICheckoutDeo | undefined> => {
    const order = await orderRepo.findById(orderId);
    if (order === null) {
      throw new Error("Order should be exist");
    }
    const orderDetail = await orderDetailRepo.findByOrderId(orderId);
    if (orderDetail.length === 0) {
      throw new Error("Order detail should be exist");
    }
    let amount = 0;
    const packages = await Promise.all(
      orderDetail.map(async (orderDetail) => {
        const good = await goodsRepo.findByBarcode(orderDetail.barcode);
        if (good === null) {
          throw new Error(
            `Goods with barcode ${orderDetail.barcode} not found, contact the admin`
          );
        }
        amount += orderDetail.subtotal;
        return {
          id: orderDetail.id.toString(),
          amount: orderDetail.subtotal,
          products: [
            {
              name: orderDetail.name,
              quantity: orderDetail.quantity,
              price: good.price,
            },
          ],
        };
      })
    );
    const requiredOrderObj = {
      orderId: String(orderId),
      amount: amount,
      currency: "TWD",
      packages: packages,
    };

    const linePayBody = {
      ...requiredOrderObj,
      redirectUrls: {
        confirmUrl: `${process.env.LINEPAY_RETURN_HOST}${process.env.LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${process.env.LINEPAY_RETURN_HOST}${process.env.LINEPAY_RETURN_CANCEL_URL}`,
      },
    };
    const uri = "/payments/request";
    const headers = await tool.createSignature(uri, linePayBody);
    const url = `${process.env.LINEPAY_SITE}/${process.env.LINEPAY_VERSION}${uri}`;
    try {
      const linePayRes = await axios.post(url, linePayBody, { headers });
      if (linePayRes?.data?.returnCode === "0000") {
        console.log("linePayRes", linePayRes?.data?.info.paymentUrl.web);
        return {
          order: order,
          redirectLinePayUrl: linePayRes?.data?.info.paymentUrl.web,
        };
      }else {
        throw new Error("Error in Line pay ->");
      }
    } catch (error) {
      console.error("Error in Line pay ->", error);
      throw error;
    }
  },
  confirmLinePay: async (
    orderId: number,
    transactionId: string,
    total: number
  ) => {
    const order = await orderRepo.findById(orderId);
    if (order === null) {
      throw new Error("Order should be exist");
    }
    const linePayBody = {
      amount: total,
      currency: "TWD",
    };
    const uri = "/payments/" + transactionId + "/confirm";
    const headers = await tool.createSignature(uri, linePayBody);
    const url = `${process.env.LINEPAY_SITE}/${process.env.LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });
    console.log("linePayRes", linePayRes);
    if (linePayRes?.data?.returnCode === "0000") {
      return Database.transaction(async (transactionManager) => {
        try {
          const orderStatus = await OrderStatus.findOne({
            where: { orderId: orderId },
          });
          if (!orderStatus) {
            throw new Error("Order status should be exist");
          }
          orderStatus.paymentMethod = "line";
          order.total = total;
          await order.save();
          await orderStatus.save();
          const orderDetails = await orderDetailRepo.findByOrderId(orderId);
          const updatePromises = orderDetails.map(async (orderDetail) => {
            const good = await goodsRepo.findByBarcode(orderDetail.barcode);

            if (good) {
              good.stock -= orderDetail.quantity;
              return transactionManager.save(good);
            } else {
              throw new Error(
                `Goods with barcode ${orderDetail.barcode} not found, contact the admin`
              );
            }
          });
          await Promise.all(updatePromises);
        } catch (error) {
          console.error("Error in DB ->", error);
          throw error;
        }
      });
    }
  },
};
