import { FindManyOptions, ILike } from "typeorm";
import { Good } from "../../Database/Entities/good.js";

export const goodsRepo = {
  findByName: async (name: string): Promise<Good | null> => {
    try {
      const good = await Good.findOne({ where: { name: name } });
      return good;
    } catch (error) {
      throw error;
    }
  },
  findManyByName: async (name: string): Promise<Good[]> => {
    try {
      const good = await Good.find({ 
        where: { 
          name: ILike(`%${name}%`) 
        } 
      });
      return good;
    } catch (error) {
      throw error;
    }
  },
  findByBarcode: async (barcode: string): Promise<Good | null> => {
    try {
      const good = await Good.findOne({ where: { barcode: barcode } });
      return good;
    } catch (error) {
      throw error;
    }
  },
  findAll: async (): Promise<Good[]> => {
    try {
      const goods = await Good.createQueryBuilder('good').getMany();
      return goods;
    } catch (error) {
      throw error;
    }
  },
  
  
  insertNewGoods: async (
    name: string,
    stock: number,
    price: number,
    barcode: string
  ): Promise<void> => {
    try {
      const newGood = new Good();
      newGood.name = name;
      newGood.stock = stock;
      newGood.price = price;
      newGood.barcode = barcode;
      await newGood.save();
    } catch (error) {
      throw error;
    }
  },
  updateGoods: async (
    name: string,
    stock: number,
    price: number,
    good: Good
  ): Promise<void> => {
    try {
      good.name = name;
      good.stock = stock;
      good.price = price;
      await good.save();
    } catch (error) {
      throw error;
    }
  },
  findById: async (id: number): Promise<Good | null> => {
    try {
        const good = await Good.findOne({ where: { id: id } });
        return good;
    } catch (error) {
        throw error;
    }
},
};
