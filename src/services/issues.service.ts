import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issuesRepository: Repository<Issue>,
    private readonly usersService: UsersService,
  ) {}

  async createIssue(issueData, userData) {
    const user = await this.usersService.getUserById(userData.id);
    if ('message' in user) return user;

    const issue = new Issue();
    issue.id = uuidv4();
    const date = new Date();
    issue.title = issueData.title || 'No Info';
    issue.description = issueData.description || 'No Info';
    issue.lat = issueData.lat;
    issue.lng = issueData.lng;
    issue.zone = issueData.zone;
    issue.createdAt = date;
    issue.updatedAt = date;
    issue.ownerId = user;
    issue.status = issueData.status;
    issue.priority = issueData.priority;

    const savedIssue = await this.issuesRepository.save(issue);

    for (let i = 0; i < issueData.pictures.length; i++) {
      ('upload images to imgbb & return array of links');
    }
  }

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
