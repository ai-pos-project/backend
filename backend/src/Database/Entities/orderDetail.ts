import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, Relation, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { Order } from "./order.js";

@Entity({ name: 'OrderDetails' })
export class OrderDetail extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer"})
    id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name!: string;

    @Column({ type: "varchar", length: 100, nullable: true})
    barcode!: string;

    @Column({ type: "integer", nullable: false })
    orderId!: number;

    @Column({ type: "int", default: 0 })
    subtotal!: number;

    @Column({ type: "int", default: 0 })
    quantity!: number;
    
    @Column({ type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;


    @ManyToOne(() => Order, order => order.orderDetails, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'orderId' })
    order?: Relation<Order>;

    // @ManyToOne(() => Good, good => good.orderDetails, { onDelete: "CASCADE" })
    // @JoinColumn({ name: 'goodId' })
    // good?: Relation<Good>;

}
