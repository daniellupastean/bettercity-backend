import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/services/users.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { hasRoles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @hasRoles('admin', 'citizen')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
