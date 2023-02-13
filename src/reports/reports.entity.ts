import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export class Report{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;
}
