/* eslint-disable prettier/prettier */
import { Report } from "src/reports/reports.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: true})
  admin: boolean

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
