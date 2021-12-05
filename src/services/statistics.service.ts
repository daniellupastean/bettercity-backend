import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { IssuesService } from './issues.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Issue)
    private readonly issuesRepository: Repository<Issue>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
  ) {}

  async getIssuesNoByStatus(status: string): Promise<number> {
    return (
      await this.issuesRepository.find({
        where: { status },
      })
    ).length;
  }

  async getMostActiveUser() {
    const users = await this.usersRepository.find({
      order: { resolvedReportedIssues: 'DESC' },
      take: 1,
    });

    if (!users.length) return { message: 'there are no users in the database' };

    return users[0];
  }

  async getAllIssuesNo() {
    return (await this.issuesRepository.find()).length;
  }

  async getIssuesAddedInTheLast24Hours() {
    const currentDate = moment();
    const issues = await this.issuesRepository.find();
    let issuesNo = issues.filter(
      (issue) => currentDate.diff(moment(issue.createdAt), 'hours') <= 24,
    ).length;
    return issuesNo;
  }

  async getStatistics() {
    // const statistics = {
    //   hoursForGettingInProgress: 10,
    //   hoursForGettingResolved: 10,
    //   averageResolvingTime: 100,
    // };

    const notAssignedIssues = await this.getIssuesNoByStatus('not assigned');
    const inProgressIssues = await this.getIssuesNoByStatus('in progress');
    const totalResolvedIssues = await this.getIssuesNoByStatus('resolved');
    const totalIssuesManagedInTheApp = await this.getAllIssuesNo();

    const issuesAddedInTheLast24Hours =
      await this.getIssuesAddedInTheLast24Hours();

    const mostActiveUser = await this.getMostActiveUser();

    return {
      notAssignedIssues,
      inProgressIssues,
      totalResolvedIssues,
      totalIssuesManagedInTheApp,
      issuesAddedInTheLast24Hours,
      mostActiveUser,
    };
  }
}
