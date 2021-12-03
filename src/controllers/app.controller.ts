import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from '../services/app.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { UsersService } from 'src/services/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() data) {
    return this.appService.login(data); // return JWT access token
  }

  @Post('register')
  async register(@Body() data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
    return this.appService.register(data);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return await this.appService.resetPassword(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@AuthUser() user: any) {
    return await this.usersService.getUserById(user.id);
  }
}
