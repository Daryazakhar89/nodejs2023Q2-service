import { Injectable } from '@nestjs/common';
import { User, CreateUserDto, UpdateUserDto } from './user.dto';
import { DataBase } from 'src/db/DataBase';

@Injectable()
export class UserService {
  private db: DataBase;

  constructor() {
    this.db = DataBase.getInstance();
  }

  getAllUsers(): Promise<User[]> {
    return this.db.getUsers();
  }

  getUserByID(id: string): Promise<User> {
    return this.db.getUserByID(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.db.createUser(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.db.updateUser(id, updateUserDto);
  }

  deleteUser(id: string): Promise<void> {
    return this.db.deleteUser(id);
  }
}
