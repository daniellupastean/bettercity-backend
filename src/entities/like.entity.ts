import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Issue } from './issue.entity';
import { Suggestion } from './suggestion.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  suggestionId: string;

  @ManyToOne((type) => Suggestion, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  suggestion: Suggestion;
}
