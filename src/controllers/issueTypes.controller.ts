import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { IssueTypesService } from 'src/services/issueTypes.service';

@Controller('issues/types')
export class IssueTypesController {
  constructor(private readonly issueTypesService: IssueTypesService) {}

  @Post('create')
  createIssueType(@Body('type') type: string) {
    return this.issueTypesService.createType(type);
  }

  @Get()
  async getAllIssueTypes() {
    return await this.issueTypesService.getAllTypes();
  }
}
