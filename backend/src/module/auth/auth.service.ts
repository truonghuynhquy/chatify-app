import { Injectable } from '@nestjs/common';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
  async signup(signupDto: { email: string; password: string }) {
    const { email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return {
      message: 'Sign up successfully',
      user: {
        email,
        password: hashedPassword,
      },
    };
  }

  login() {
    return 'Login endpoint';
  }

  logout() {
    return 'Logout endpoint';
  }
}
