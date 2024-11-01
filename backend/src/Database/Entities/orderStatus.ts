import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Relation, OneToOne, JoinColumn } from "typeorm";
import { Order } from "./order.js";

@Entity({ name: 'OrderStatus' })
export class OrderStatus extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number;

    @Column({ type: "boolean", default: false })
    isPaid!: boolean;

    @Column({ type: "varchar", length: 255, nullable: false })
    paymentMethod!: string;

    @Column({ type: "integer", nullable: false })
    orderId!: number;

    @Column({ type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToOne(() => Order, order => order.orderStatus, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'orderId' })
    order?: Relation<Order>;
}
