import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  @Expose()
  version: number;

  @Column()
  @Expose()
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  @CreateDateColumn()
  createdAt: number;

  @Column()
  @Expose()
  @Transform(({ value }) => value.getTime(), { toPlainOnly: true })
  @UpdateDateColumn()
  updatedAt: number;
}
