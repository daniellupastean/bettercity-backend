import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isValidUuid } from 'src/common/utils';
import { IssueType } from 'src/entities/issueType.entity';
import { Like } from 'src/entities/like.entity';
import { Repository } from 'typeorm';
import { IssuesService } from './issues.service';
import { UsersService } from './users.service';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
  ) {}

  async addLike(userId: string, issueId: string) {
    if (!isValidUuid(userId)) return { message: 'Invalid user ID' };
    const user = await this.usersService.getUserById(userId);
    if ('message' in user) return user;

    if (!isValidUuid(issueId)) return { message: 'Invalid issue ID' };
    const issue = await this.issuesService.getIssueById(issueId);
    if ('message' in issue) return issue;

    const existingLike = await this.likesRepository.findOne({
      userId,
      issueId,
    });
    if (existingLike) {
      await this.likesRepository.delete({ id: existingLike.id });
      return { message: 'Unliked the issue' };
    }

    await this.likesRepository.save({ userId, issueId });

    return { message: 'Liked the issue' };
  }
}
