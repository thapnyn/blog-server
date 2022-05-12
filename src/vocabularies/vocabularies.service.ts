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
      const newVocabulary = {
        ...createVocabularyDto,
        idUser: user.userId,
      }
      return await this.VocabularyModel.create(newVocabulary);
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: error.code,
        message: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
