import e from "express";
import { User } from "../../Database/Entities/user.js";
import { EntityManager, FindManyOptions, Like, Not } from "typeorm";
export const userRepo = {
  insertNewManager: async (
    phone: string,
    password: string,
    transactionManager: EntityManager
  ): Promise<User> => {
    try {
      const newManager = new User();
      newManager.phone = phone;
      newManager.identity = "manager";
      newManager.password = password;
      const savedUser = await transactionManager.save(newManager);
      console.log(savedUser);
      return savedUser;
    } catch (error) {
      throw error;
    }
  },
  insertNewUserByName: async (
    name: string,
    transactionManager: EntityManager
  ): Promise<User> => {
    try {
      const newUser = new User();
      newUser.name = name;
      newUser.identity = "customer";
      const savedUser = await transactionManager.save(newUser);
      return savedUser;
    } catch (error) {
      throw error;
    }
  },
  findById: async (userId: number): Promise<User | null> => {
    try {
      const user = await User.findOne({ where: { id: userId } });
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  },
  findByEmail: async (email: string): Promise<User | null> => {
    try {
      const user = await User.findOne({ where: { email: email } });
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  },
  findByPhone: async (phone: string): Promise<User | null> => {
    try {
      const user = await User.findOne({ where: { phone: phone } });
      return user;
    } catch (error) {
      throw error;
    }
  },
  findAllExceptManager: async (): Promise<User[] | []> => {
    try {
      const users = await User.find({
        where: {
          identity: Not("manager"),
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  },
  findByName: async (filterType: string): Promise<User[] | []> => {
    try {
      const users = await User.find({
        where: {
          name: Like(`%${filterType}%`),
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  },
  findOneByName: async (name: string): Promise<User | null> => {
    try {
      const user = await User.findOne({ where: { name: name } });
      return user;
    } catch (error) {
      throw error;
    }
  },
};
