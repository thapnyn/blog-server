import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';

export const listBoxId = [1, 2, 3, 4, 5];

export class CreateVocabularyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nameCode: string;

  @ApiProperty()
  idCate: string;
}