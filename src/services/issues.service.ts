import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { PicturesService } from './pictures.service';
import { isValidUuid } from 'src/common/utils';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issuesRepository: Repository<Issue>,
    private readonly usersService: UsersService,
    private readonly picturesService: PicturesService,
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
    issue.type = issueData.type;
    issue.address = issueData.address;
    issue.createdAt = date;
    issue.updatedAt = date;
    issue.ownerId = user.id;
    issue.status = 'not assigned';
    issue.priority = issueData.priority;

    const savedIssue = await this.issuesRepository.save(issue);

    const links = await this.picturesService.uploadPictures(
      issueData.pictures,
      issue.id,
    );

    savedIssue['pictures'] = links;

    return savedIssue;
  }

  async getIssueById(id: string) {
    const issue = await this.issuesRepository.findOne({ id });
    if (!issue) return { message: 'Issue not found' };
    return issue;
  }

  async getIssuesByOwnerId(ownerId: string) {
    if (!isValidUuid(ownerId)) return { message: 'Invalid UUID' };
    const user = await this.usersService.getUserById(ownerId);
    if ('message' in user) return user;

    const issues = await this.issuesRepository.find({
      where: { ownerId },
      relations: ['pictures', 'likes'],
    });

    (issues as any).forEach((issue) => {
      issue?.pictures?.map((picture) => picture.link);
      issue?.likes?.map((like) => like.user.id);
    });

    return issues;
  }

  async getAllIssues() {
    const issues = await this.issuesRepository.find({
      relations: ['pictures', 'likes'],
    });
    (issues as any).forEach((issue) => {
      issue?.pictures?.map((picture) => picture.link);
      issue?.likes?.map((like) => like.user.id);
    });

    return issues;
  }

  async deleteIssue(id: string) {
    return 'to be implemented';
  }

  async editIssue(issueData) {}
}
