import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userInfo } = createUserDto;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = {
      ...userInfo,
      password: hashPassword,
    }

    const user = await this.UserModel.create(newUser);
    return user;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({username}).exec();
  }
}
