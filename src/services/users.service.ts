import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) return { message: 'User not found' };
    delete user.password;
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email: email });
    if (!user) return { message: 'User with given email not found!' };
    delete user.password;

    return user;
  }

  async getAllUsers() {
    return 'to be implemented';
  }

  async deleteUser(id: string) {
    return 'to be implemented';
  }
}
