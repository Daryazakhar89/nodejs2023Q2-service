import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { SignUpUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import config from 'config';
import { RefreshTokenDTO } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signUp(userDto: SignUpUserDto): Promise<object> {
    const saltOrRounds = parseInt(config.CRYPT_SALT);
    const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return {
      id: user.id,
      login: user.login,
    };
  }

  async login(
    userDto: SignUpUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findOneBy({
      login: userDto.login,
    });

    if (!user || !user.password) {
      throw new ForbiddenException({
        message: 'Invalid login or password',
      });
    }

    if (!user.login.length || !user.password.length) {
      throw new NotFoundException({
        message: 'User with this login is not found',
      });
    }

    await bcrypt.compare(userDto.password, user.password);

    const payload = { id: user.id, login: user.login };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: config.JWT_SECRET_KEY,
      expiresIn: config.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: config.JWT_SECRET_REFRESH_KEY,
      expiresIn: config.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshedToken: RefreshTokenDTO) {
    try {
      const tokenData = await this.jwtService.verifyAsync(
        refreshedToken.refreshToken,
        {
          secret: config.JWT_SECRET_REFRESH_KEY,
        },
      );

      const payload = {
        id: tokenData.id,
        login: tokenData.login,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: config.JWT_SECRET_KEY,
        expiresIn: config.TOKEN_EXPIRE_TIME,
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: config.JWT_SECRET_REFRESH_KEY,
        expiresIn: config.TOKEN_REFRESH_EXPIRE_TIME,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
