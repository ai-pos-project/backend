import { Database } from "../../Database/data-source.js";
import { userRepo } from "../Repository/userRepo.js";

import {
  GoodsExistsError,
  GoodsNotFoundError,
  ManagerNotFoundError,
  OrderNotFoundError,
  UserExistsError,
  UserNotFoundError,
} from "../../Errors/error.js";
import { Signin } from "../../Application/Features/Manager/Commands/SignIn/Types/api.js";
import { managerRepo } from "../Repository/managerRepo.js";
import { goodsRepo } from "../Repository/goodsRepo.js";
import { Good } from "../../Database/Entities/good.js";
import { SearchGoods } from "../../Application/Features/Manager/Queries/SearchGood/Types/api.js";
import { User } from "../../Database/Entities/user.js";
import { SearchTransactions } from "../../Application/Features/Manager/Queries/SearchTransaction/Types/api.js";
import { orderRepo } from "../Repository/orderRepo.js";
import { orderStatusRepo } from "../Repository/orderStatusRepo.js";
import { AddOrder } from "../../Application/Features/Manager/Commands/AddOrder/Types/api.js";
import { Order } from "../../Database/Entities/order.js";
import { orderDetailRepo } from "../Repository/orderDetailRepo.js";
import { OrderDetail } from "../../Database/Entities/orderDetail.js";
export const managerService = {
  signUp: async (
    phone: string,
    password: string
  ): Promise<ManagerSignup.IUserDto> => {
    const checkUserExist = await userRepo.findByPhone(phone);
    if (checkUserExist != null) throw new UserExistsError();
    // transaction begin
    const result = await Database.transaction(async (transactionManager) => {
      try {
        const newUser = await userRepo.insertNewManager(
          phone,
          password,
          transactionManager
        );

        const response: ManagerSignup.IUserDto = {
          id: newUser.id,
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
  signIn: async (phone: string): Promise<Signin.ISignInDto> => {
    const checkUserExist = await managerRepo.findByPhone(phone);
    if (!checkUserExist) {
      throw new ManagerNotFoundError();
    }
    return {
      id: checkUserExist.id,
      password: checkUserExist.password,
    };
  },
  addGoods: async (
    name: string,
    stock: number,
    price: number,
    barcode: string
  ): Promise<void> => {
    const checkGoodsExist = await goodsRepo.findByBarcode(barcode);
    if (checkGoodsExist != null) throw new GoodsExistsError();

    await goodsRepo.insertNewGoods(name, stock, price, barcode);
  },
  updateGoods: async (
    name: string,
    stock: number,
    price: number,
    id: number
  ): Promise<void> => {
    const checkGoodsExist = await goodsRepo.findById(id);
    if (checkGoodsExist === null) throw new GoodsNotFoundError();

    await goodsRepo.updateGoods(name, stock, price, checkGoodsExist);
  },
  searchGoods: async (
    name: string | undefined
  ): Promise<SearchGoods.ISearchGoodsDto[]> => {
    if (name) {
      const user = await goodsRepo.findManyByName(name);
      return user.map((good: Good) => {
        return {
          id: good.id,
          name: good.name,
          stock: good.stock,
          barcode: good.barcode,
          price: good.price,
        };
      });
    }
    const user = await goodsRepo.findAll();
    return user.map((good: Good) => {
      return {
        id: good.id,
        name: good.name,
        stock: good.stock,
        barcode: good.barcode,
        price: good.price,
      };
    });
  },
  searchTransactions: async (
    name: string | undefined
  ): Promise<SearchTransactions.ISearchTransactionsDto[]> => {
    const queryBuilder = User.createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "order")
      .leftJoinAndSelect("order.orderDetails", "orderDetail")
      .leftJoinAndSelect("order.orderStatus", "orderStatus")
      .select([
        "user.name",
        "order.id",
        "order.createdAt",
        "order.total",
        "orderDetail.name",
        "orderDetail.quantity",
        "orderDetail.subtotal",
        "orderStatus.isPaid",
        "orderStatus.paymentMethod",
      ]);
  
    if (name) {
      queryBuilder.andWhere("user.name LIKE :name", { name: `%${name}%` });
    }
  
    const results = await queryBuilder.getMany();
  
    const formattedResults = results.flatMap(user =>
      user.orders?.map(order => ({
        name: user.name,
        id: order.id,
        createdAt: order.createdAt,
        total: order.total,
        orderDetail: order.orderDetails?.map(orderDetail => ({
          name: orderDetail.name,
          quantity: orderDetail.quantity,
          subtotal: orderDetail.subtotal,
        })),
        orderStatus: {
          isPaid: order.orderStatus?.isPaid,
          paymentMethod: order.orderStatus?.paymentMethod,
        }
      }))
    );
  
    return formattedResults.filter(
      (item): item is SearchTransactions.ISearchTransactionsDto =>
        item !== undefined
    );
  },  
  deleteGoods: async (goodId: number): Promise<void> => {
    const checkGoodsExist = await goodsRepo.findById(goodId);
    if (checkGoodsExist === null) throw new GoodsNotFoundError();

    await Good.delete(goodId);
  },
  confirmPayment: async (orderId: number, isPaid: boolean): Promise<void> => {
    const checkOrderExist = await orderRepo.findById(orderId);
    if (checkOrderExist === null) throw new OrderNotFoundError();

    await orderStatusRepo.updateStatus(orderId, isPaid);
  },
  addOrder: async (body: AddOrder.IAddOrderReqBody): Promise<void> => {
    return Database.transaction(async (transactionManager) => {
      try {
        const checkUserExist = await userRepo.findOneByName(
          body.name as string
        );
        if (checkUserExist === null) throw new UserNotFoundError();

        let order = new Order();
        order.total = body.total;
        order.userId = checkUserExist.id;
        order = await transactionManager.save(order);
        await orderStatusRepo.insertNewOrderStatus(
          order.id,
          body.isPaid,
          body.paymentMethod,
          transactionManager
        );
        const orderDetailsPromises = body.orderDetails.map((orderDetail) => {
          const orderDetailObj = new OrderDetail();
          orderDetailObj.name = orderDetail.name;
          orderDetailObj.quantity = orderDetail.quantity;
          orderDetailObj.subtotal = orderDetail.price*orderDetail.quantity;
          orderDetailObj.orderId = order.id;
          return transactionManager.save(orderDetailObj);
        });
        await Promise.all(orderDetailsPromises);
      } catch (error) {
        console.error("Error in DB ->", error);
        throw error;
      }
    });
  },
};
