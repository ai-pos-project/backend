import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Relation } from "typeorm";


@Entity({ name: 'Goods' })
export class Good extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "integer" })
    id!: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name!: string;

    @Column({ type: "int", default: 0 })
    stock!: number;

    @Column({ type: "varchar", length: 50, nullable: true })
    category!: string | null;

    @Column({ type: "int", default: 0 })
    price!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    barcode!: string;

    @Column({ type: "text", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    // @OneToMany(() => OrderDetail, orderDetail => orderDetail.good, { onDelete: "CASCADE" })
    // orderDetails?: Relation<OrderDetail>;
}
