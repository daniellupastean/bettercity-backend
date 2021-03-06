import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/services/users.service';
import { IssuesService } from 'src/services/issues.service';
import { LikesService } from 'src/services/likes.service';

@Controller('issues')
export class IssuesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly issuesService: IssuesService,
    private readonly likesService: LikesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createIssue(@Body() data, @AuthUser() user: any) {
    return this.issuesService.createIssue(data, user);
  }

  @Get(':id')
  async getIssueById(@Param('id') id: string) {
    return await this.issuesService.getIssueById(id);
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
  @Post('edit')
  async editIssue(@Body() issueData) {
    // return await this.issuesService.getIssuesByOwnerId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('like')
  async addLike(@AuthUser() user: any, @Body('issueId') issueId: string) {
    return await this.likesService.addLike(user.id, issueId);
  }

  @Post('change-status')
  async changeIssueStatus(
    @Body('id') issueId: string,
    @Body('status') status: string,
  ) {
    return await this.issuesService.changeIssueStatus(issueId, status);
  }
}
