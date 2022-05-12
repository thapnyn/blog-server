import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { Vocabulary } from './schemas/vocabulary.schema';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectModel(Vocabulary.name) private readonly VocabularyModel: Model<Vocabulary>,
  ) {}

  async create(user: UserDto, createVocabularyDto: CreateVocabularyDto): Promise<any> {
    try {
      // For nameCode multiple: [cat dog chicken ....]
      if (this.checkMultipleNameCode(createVocabularyDto.nameCode)) {
        const SPACE = " ";
        const { nameCode, ...vocabularyDto } = createVocabularyDto;
        const vocabularyArray: Array<string> = nameCode.trim().split(SPACE);
        
        for (const vocabularyItem of vocabularyArray) {
          const newVocabulary = {
            ...vocabularyDto,
            nameCode: vocabularyItem,
            idUser: user.userId,
          }
          await this.VocabularyModel.create(newVocabulary);
        }
        return {
          statusCode: HttpStatus.CREATED,
          massage: `${vocabularyArray.join(", ")} has been added successfully`
        };
      } else {
        // For nameCode single: [cat]
        const newVocabulary = {
          ...createVocabularyDto,
          idUser: user.userId,
        }
        return await this.VocabularyModel.create(newVocabulary);
      }
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: error.code,
        message: error.code === 11000 ? `[${createVocabularyDto.nameCode}] already exists` : error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  private checkMultipleNameCode(nameCode: string): boolean {
    if (/\s/g.test(nameCode.trim())) {
      return true;
    }
    return false;
  }
}
