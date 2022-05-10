import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}