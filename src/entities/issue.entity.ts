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
import { Picture } from './picture.entity';
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

  @Column({ nullable: true })
  ressolvedAt: Date;

  @Column()
  description: string;

  @Column()
  lat: string;

  @Column()
  lng: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Picture, (picture) => picture.issueId)
  pictures: Picture[];
}
