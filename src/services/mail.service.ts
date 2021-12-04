import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { generateResetToken } from 'src/common/utils';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async sendChangePasswordEmail(user: User) {
    const resetToken = generateResetToken();
    const hashedResetToken = await bcrypt.hash(resetToken, 12);

    console.log(hashedResetToken);
    await this.usersService.updateResetTokeByUserId(user, hashedResetToken);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your Better City password',
      template: './change-password',
      context: {
        name: user.name,
        url: 'https://bettercity.herokuapp.com/reset-password/' + resetToken,
      },
    });

    return { message: 'We have emailed you a password reset link!' };
  }
}
