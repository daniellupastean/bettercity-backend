import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Like } from './like.entity';
import { Picture } from './picture.entity';
import { User } from './user.entity';

@Entity('suggestions')
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  ownerId: string;

  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Picture, (picture) => picture.issue)
  @JoinColumn()
  pictures: Picture[];

  @OneToMany(() => Like, (like) => like.suggestion)
  @JoinColumn()
  likes: Like[];
}
