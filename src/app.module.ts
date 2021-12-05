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
import { IssueTypesService } from './services/issueTypes.service';
import { IssueTypesController } from './controllers/issueTypes.controller';
import { IssueType } from './entities/issueType.entity';

import { LikesService } from './services/likes.service';
import { Like } from './entities/like.entity';
import { Suggestion } from './entities/suggestion.entity';
import { StatisticsService } from './services/statistics.service';
import { StatisticsController } from './controllers/statistics.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Issue]),
    TypeOrmModule.forFeature([Suggestion]),
    TypeOrmModule.forFeature([Picture]),
    TypeOrmModule.forFeature([IssueType]),
    TypeOrmModule.forFeature([Like]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MailerModule.forRoot(mailConfig),
  ],
  controllers: [
    AppController,
    UsersController,
    IssuesController,
    IssueTypesController,
    StatisticsController,
  ],
  providers: [
    AppService,
    UsersService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    MailService,
    IssuesService,
    PicturesService,
    IssueTypesService,
    LikesService,
    StatisticsService,
  ],
})
export class AppModule {}
