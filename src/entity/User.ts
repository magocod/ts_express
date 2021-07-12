import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
