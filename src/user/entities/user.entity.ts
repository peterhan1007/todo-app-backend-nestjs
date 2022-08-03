import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { Field, ObjectType } from '@nestjs/graphql';
import { hash } from 'bcryptjs';

@Entity()
@ObjectType()
export class User extends EntityHelper {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Field()
  @Column({ nullable: false })
  name: string;

  @Index()
  @Column({ unique: true, nullable: true })
  email: string | null;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  @Index()
  @Column({ nullable: false })
  title: string | null;

  @Index()
  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
