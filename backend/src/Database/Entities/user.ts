import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  Relation,
} from "typeorm";
import { Order } from "./order.js";

@Entity({ name: "Users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  name!: string | null;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password!: string | null;

  @Column({
    type: "varchar",
    nullable: false,
  })
  identity!: string;

  @Column({ type: "boolean", default: true })
  isActive!: boolean | null;

  @Column({ type: "varchar", length: 255, unique: true, nullable: true })
  phone!: string | null;

  @Column({
    type: "datetime",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders?: Relation<Order[]>;
}
