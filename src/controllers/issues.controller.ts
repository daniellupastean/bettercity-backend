import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/services/users.service';
import { IssuesService } from 'src/services/issues.service';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createIssue(@Body() data, @AuthUser() user: any) {
    return this.issuesService.createIssue(data, user);
  }

  @Get()
  async getAllIssues() {
    return await this.issuesService.getAllIssues();
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async getCurrentUserIssues(@AuthUser() user: any) {
    return await this.issuesService.getIssuesByOwnerId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('edit')
  async editIssue(@Body() issueData) {
    // return await this.issuesService.getIssuesByOwnerId(user.id);
  }
}
