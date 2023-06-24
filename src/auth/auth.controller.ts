import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/auth.dto';
import { Public } from '../libs/decorators/Public';
import { RefreshTokenDTO } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(201)
  @Post('signup')
  signUp(@Body() userDto: SignUpUserDto): Promise<object> {
    return this.authService.signUp(userDto);
  }

  @Public()
  @Post('login')
  login(
    @Body()
    userDto: SignUpUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(userDto);
  }

  @Public()
  @Post('refresh')
  refresh(
    @Body()
    refreshedToken: RefreshTokenDTO,
  ) {
    return this.authService.refresh(refreshedToken);
  }
}
