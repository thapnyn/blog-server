import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { Vocabulary } from './schemas/vocabulary.schema';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectModel(Vocabulary.name) private readonly VocabularyModel: Model<Vocabulary>,
  ) {}

  async create(createVocabularyDto: CreateVocabularyDto): Promise<any> {
    try {
      return await this.VocabularyModel.create(createVocabularyDto);
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: error.code,
        message: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
