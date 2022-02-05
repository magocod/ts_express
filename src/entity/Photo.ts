import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { PhotoType } from "./PhotoType";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  photoTypeId: number;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToOne(() => PhotoType, (photoType) => photoType.photos)
  photoType: PhotoType;
}
