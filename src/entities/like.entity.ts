import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from './issue.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  issueId: string;

  @ManyToOne((type) => Issue, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  issue: Issue;
}
