import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, Relation, OneToMany, OneToOne } from "typeorm";
import { User } from "./user.js";
import { OrderDetail } from "./orderDetail.js";
import { OrderStatus } from "./orderStatus.js";

@Entity({ name: 'Orders' })
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number;

    @Column({ type: "int", default: 0 })
    total!: number;

    @Column({ type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "integer", nullable: false })
    userId!: number;

    @ManyToOne(() => User, user => user.orders, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userId' })
    user?: Relation<User>;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order, { cascade: true })
    orderDetails?: Relation<OrderDetail[]>;

    @OneToOne(() => OrderStatus, orderStatus => orderStatus.order, { cascade: true })
    orderStatus?: Relation<OrderStatus>;
}
