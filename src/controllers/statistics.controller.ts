import { Controller, Get } from '@nestjs/common';
import { IssuesService } from 'src/services/issues.service';
import { StatisticsService } from 'src/services/statistics.service';

import { UsersService } from 'src/services/users.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get()
  async getStatistics() {
    return await this.statisticsService.getStatistics();
  }
}
