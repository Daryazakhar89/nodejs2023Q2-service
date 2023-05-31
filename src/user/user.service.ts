import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  private users = [];

  getAllUsers() {
    return this.users;
  }

  getUserByID(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const date = Date.now();

    const newUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException();

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException({
        message: 'You old password is incorrect',
      });
    }

    user.password = updateUserDto?.newPassword;
    user.version += 1;
    return user;
  }

  deleteUser(id: string) {
    const index: number = this.users.findIndex((user) => user.id === id);

    if (index < 0)
      throw new NotFoundException({
        message: 'User with this id is not found',
      });

    this.users.splice(index, 1);
  }
}
