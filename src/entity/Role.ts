import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

import { Permission } from "./Permission";
import { User } from "./User";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user: User) => user.roles)
  @JoinTable()
  users: User[];
}
