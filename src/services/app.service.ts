import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isValidEmail } from 'src/common/utils';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async login(data) {
    const user = await this.usersRepository.findOne({ email: data.email });
    if (!user) throw new UnauthorizedException('Invalid credentials!');
    if (!(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedException('Invalid credentials!');

    const jwt = await this.jwtService.signAsync({
      user: {
        id: user.id,
        role: user.role,
      },
    });

    return { accessToken: jwt };
  }

  async register(data) {
    const existingUser = await this.usersRepository.findOne({
      email: data.email,
    });
    if (existingUser && !('message' in existingUser))
      throw new BadRequestException('Email already used');

    data['role'] = 'citizen'; // set default user role to citizen

    const user = await this.usersRepository.save(data);
    if (!user) throw new BadRequestException('Something went wrong');

    // delete result.password;
    const jwt = await this.jwtService.signAsync({
      user: {
        id: user.id,
        role: user.role,
      },
    });

    return { message: 'Account successfully created', accessToken: jwt };
  }

  async resetPassword(email: string) {
    if (!isValidEmail(email)) return { message: 'Invalid email!' };
    const user = await this.usersService.getUserByEmail(email);
    if ('message' in user) return user;

    return { message: 'Send change password email' };
  }
}
