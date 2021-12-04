import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  priority: string;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'ownerId' })
  ownerId: User;

  @Column()
  status: string;

  @Column()
  zone: string;

  @Column()
  ressolvedAt: Date;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
