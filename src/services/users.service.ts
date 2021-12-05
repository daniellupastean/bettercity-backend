import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUserById(id: string, removePassword: boolean = true) {
    const user = await this.usersRepository.findOne({ id });
    if (!user) return { message: 'User not found' };
    if (removePassword) delete user.password;
    return user;
  }

  async getUserByEmail(email: string, removePassword: boolean = true) {
    const user = await this.usersRepository.findOne({ email: email });
    if (!user) return { message: 'User with given email not found!' };
    if (removePassword) delete user.password;

    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async updateResetTokeByUserId(user: User, hashedResetToken: string) {
    user.resetToken = hashedResetToken;

    await this.usersRepository.save(user);

    return { message: 'Reset token has been set' };
  }

  async deleteUser(id: string) {
    return 'to be implemented';
  }
}
