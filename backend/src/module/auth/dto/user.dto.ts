import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

class SignupDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export default SignupDto;
