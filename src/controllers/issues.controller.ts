import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/services/users.service';
import { IssuesService } from 'src/services/issues.service';

@Controller('issues')
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createIssue(@Body() data) {
    return this.issuesService.createIssue(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async getCurrentUserIssues(@AuthUser() user: any) {
    return await this.issuesService.getIssuesByOwnerId(user.id);
  }
}
