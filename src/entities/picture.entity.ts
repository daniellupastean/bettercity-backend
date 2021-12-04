import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from './issue.entity';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @Column()
  issueId: string;

  @ManyToOne((type) => Issue, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  issue: Issue;

  @CreateDateColumn()
  createdAt: Date;
}
