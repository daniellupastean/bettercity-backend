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
import { Issue } from './issue.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @Column()
  priority: string;

  @ManyToOne((type) => Issue, (issue) => issue.id, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({ name: 'ownerId' })
  issueId: Issue;

  @CreateDateColumn()
  createdAt: Date;
}
