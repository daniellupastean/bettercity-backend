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

@Entity('issues')
export class Issue {
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
  status: string;

  @Column()
  zone: string;

  @Column({ nullable: true })
  ressolvedAt: Date;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  type: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Picture, (picture) => picture.issue)
  @JoinColumn()
  pictures: Picture[];
}
