import { DataSource } from "typeorm";
import { User } from "./Entities/user.js";
import { Order } from "./Entities/order.js";
import { OrderDetail } from "./Entities/orderDetail.js";
import { OrderStatus } from "./Entities/orderStatus.js";
import { Good } from "./Entities/good.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const Database = new DataSource({
    type: "sqlite",
    //根據當前環境目錄 -> /backend 而非編譯後的dist
    database: path.resolve(__dirname, "./database.sqlite"),
    synchronize: true,
    entities: [
        User,
        Order,
        OrderDetail,
        OrderStatus,
        Good,
    ],
})