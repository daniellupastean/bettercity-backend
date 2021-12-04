import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { typeOrmConfig } from './orm.config';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { MailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from './mail.config';
import { Issue } from './entities/issue.entity';
import { Picture } from './entities/picture.entity';
import { UsersController } from './controllers/users.controller';
import { IssuesController } from './controllers/issues.controller';
import { IssuesService } from './services/issues.service';
import { PicturesService } from './services/pictures.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Issue]),
    TypeOrmModule.forFeature([Picture]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MailerModule.forRoot(mailConfig),
  ],
  controllers: [AppController, UsersController, IssuesController],
  providers: [
    AppService,
    UsersService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    MailService,
    IssuesService,
    PicturesService,
  ],
})
export class AppModule {}
