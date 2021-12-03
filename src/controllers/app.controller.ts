import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
