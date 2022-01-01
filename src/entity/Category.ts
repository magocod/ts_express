import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

import { Question } from "./Question";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Question, (question: Question) => question.categories)
  questions: Question[];
}
