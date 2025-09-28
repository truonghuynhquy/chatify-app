import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import AuthService from './auth.service';
import SignupDto from './dto/user.dto';
import express from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    console.log('👉 Signup request:', signupDto); // log test
    return this.authService.signup(signupDto, res);
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
