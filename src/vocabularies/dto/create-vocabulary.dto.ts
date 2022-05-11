import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idBox: string;

  @ApiProperty()
  idCate: string;
}