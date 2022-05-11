import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {

    console.log('>> validateUser auth');
    const user = await this.usersService.findOne(username);

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (user && isMatchPassword) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    console.log('>> loginWithCredentials');
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return user;
  }
}
