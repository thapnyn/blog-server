import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { password, ...userInfo } = createUserDto;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = {
      ...userInfo,
      password: hashPassword,
    }

    try {
      await this.UserModel.create(newUser);
      return {
        statusCode: HttpStatus.CREATED,
        massage: `${createUserDto.username} has been created successfully`
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: error.code,
        message: error.code === 11000 ? 'Username already exists' : error.message,
      }, HttpStatus.BAD_REQUEST);
    }

  }

  async findOne(username: string): Promise<User | undefined> {
    return this.UserModel.findOne({username}).exec();
  }
}
