import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto } from './user.dto';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserByID(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    return await user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const date = Date.now();

    const newUser = plainToClass(User, {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });

    this.users.push(newUser);
    return instanceToPlain(newUser) as Promise<User>;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException();

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException({
        message: 'You old password is incorrect',
      });
    }

    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return instanceToPlain(user) as Promise<User>;
  }

  async deleteUser(id: string): Promise<void> {
    const index: number = this.users.findIndex((user) => user.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    this.users.splice(index, 1);
  }
}
