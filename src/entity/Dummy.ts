import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import { User } from "./User";

@Entity({ name: "dummies" })
export class Dummy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.dummies)
  @JoinColumn({ name: "user_id" })
  user: User;
}
