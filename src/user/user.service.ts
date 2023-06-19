import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from '../user/user.entity';
import { instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        message: 'User with this id is not found',
      });
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
    };

    const user = this.usersRepository.create(newUser);
    await this.usersRepository.save(user);

    return instanceToPlain(user) as User;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        message: 'User with this id is not found',
      });
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException({
        message: 'Your old password is incorrect',
      });
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;

    this.usersRepository.update(id, user);
    await this.usersRepository.save(user);

    return instanceToPlain(user) as User;
  }

  async deleteUser(id: string): Promise<void> {
    const deleteResult = await this.usersRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException({
        message: 'User with this id is not found',
      });
    }
  }
}
