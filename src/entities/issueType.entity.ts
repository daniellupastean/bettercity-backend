import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('issueTypes')
export class IssueType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  type: string;
}
