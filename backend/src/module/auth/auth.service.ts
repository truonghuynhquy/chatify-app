import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import SignupDto from './dto/user.dto';
import { generateToken } from '../../shared/utils/jwt.util';

@Injectable()
class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(signupDto: SignupDto, res: Response) {
    const { fullName, email, password } = signupDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException(`User already exists with email ${email}`);
    }

    const sail = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, sail);
    const newUser = new this.userModel({
      fullName,
      email,
      password: hashedPassword,
    });

    try {
      if (newUser) {
        const savedUser = await newUser.save();
        const userId =
          savedUser._id instanceof Types.ObjectId
            ? savedUser._id.toHexString()
            : String(savedUser._id);
        generateToken(userId, res);
        return {
          _id: savedUser._id,
          fullName: savedUser.fullName,
          email: savedUser.email,
          profileImage: savedUser.profileImage,
        };
      }
    } catch (err) {
      throw new InternalServerErrorException(`User while saving user ${err}`);
    }
  }

  login() {
    return 'Login endpoint';
  }

  logout() {
    return 'Logout endpoint';
  }
}

export default AuthService;
