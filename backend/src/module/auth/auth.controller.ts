import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: { email: string; password: string }) {
    console.log('👉 Signup request:', signupDto); // log test
    return this.authService.signup(signupDto);
  }

  @Get('login')
  login() {
    return this.authService.login();
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
