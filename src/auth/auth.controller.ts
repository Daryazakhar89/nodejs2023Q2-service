import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/auth.dto';
import { Public } from '../libs/decorators/Public';

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
  ): Promise<{ accessToken: string }> {
    return this.authService.login(userDto);
  }

  // @Post('refresh')
  // refresh(
  //   @Body()
  //   userDto: SignUpUserDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.refresh(userDto);
  // }
}
