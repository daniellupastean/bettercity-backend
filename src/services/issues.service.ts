import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issuesRepository: Repository<Issue>,
    private readonly usersService: UsersService,
  ) {}

  async createIssue(issueData) {}

  async getIssueById(id: string) {
    const issue = await this.issuesRepository.findOne({ id });
    if (!issue) return { message: 'Issue not found' };
    return issue;
  }

  async getIssuesByOwnerId(ownerId: string) {
    const user = await this.usersService.getUserById(ownerId);
    if ('message' in user) return user;

    return await this.issuesRepository.find({
      where: { ownerId },
      relations: ['ownerId'],
    });
  }

  async getAllIssues() {
    return 'to be implemented';
  }

  async deleteIssue(id: string) {
    return 'to be implemented';
  }
}
