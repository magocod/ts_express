import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  BaseEntity, CreateDateColumn, UpdateDateColumn
} from "typeorm";

import bcrypt from "bcrypt";

import { Profile } from "./Profile";
import { Photo } from "./Photo";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  profileId: number;

  @Column({ select: false, nullable: false })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Photo, (photo: Photo) => photo.user)
  photos: Photo[];

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

export default User;
