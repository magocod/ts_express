import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
