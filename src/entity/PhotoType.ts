import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Photo } from "./Photo";

@Entity()
export class PhotoType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Photo, (photo: Photo) => photo.user)
  photos: Photo[];
}