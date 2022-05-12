import { Injectable, HttpStatus } from '@nestjs/common';
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

  async createVocabulary(user: UserDto, createVocabularyDto: CreateVocabularyDto): Promise<any> {
    // For nameCode multiple: [cat dog chicken ....]
    if (this.checkMultipleNameCode(createVocabularyDto.nameCode)) {
      const SPACE = " ";
      const { nameCode, ...vocabularyDto } = createVocabularyDto;
      const vocabularyArray: Array<string> = nameCode.trim().split(SPACE);
      const listVocabularyResult: Array<string> = [];
      
      for (const vocabularyItem of vocabularyArray) {
        const newVocabulary = {
          ...vocabularyDto,
          nameCode: vocabularyItem,
          idUser: user.userId,
        }
        const nameCode = await this.create(user, newVocabulary);
        if (nameCode) listVocabularyResult.push(nameCode);
      }

      if (listVocabularyResult.length) {
        return {
          statusCode: HttpStatus.CREATED,
          massage: `[${listVocabularyResult.join(", ")}] has been added successfully`,
          data: listVocabularyResult
        };
      } else {
        return {
          statusCode: HttpStatus.CONFLICT,
          massage: 'All the vocabulary has already been added',
          data: null,
        }
      }
      
    } else {
      // For nameCode single: [cat]
      const newVocabulary = {
        ...createVocabularyDto,
        idUser: user.userId,
      }
      const nameCode = await this.create(user, newVocabulary);

      if (nameCode) {
        return {
          statusCode: HttpStatus.CREATED,
          massage: `[${nameCode}] has been added successfully`,
          data: nameCode
        };
      } else {
        return {
          statusCode: HttpStatus.CONFLICT,
          massage: `[${newVocabulary.nameCode}] has already been added`,
          data: null
        };
      }
      
    }
  }

  async create(user: UserDto, createVocabularyDto: CreateVocabularyDto): Promise<string> {
    // check duplicate vocabulary
    if (await this.isDuplicateVocabulary(createVocabularyDto.nameCode, user.userId)) return;
    const newVocabulary = {
      ...createVocabularyDto,
      idUser: user.userId,
    }
    const result = await this.VocabularyModel.create(newVocabulary);
    return result.nameCode;
  }

  async findAll(userId: string): Promise<Vocabulary[]> {
    return this.VocabularyModel.find({
      idUser: userId
    }).exec();
  }

  private checkMultipleNameCode(nameCode: string): boolean {
    if (/\s/g.test(nameCode.trim())) {
      return true;
    }
    return false;
  }

  private async isDuplicateVocabulary(nameCode: string, idUser: string): Promise<boolean> {
    const existedVocabulary = await this.VocabularyModel
      .findOne({ 
        nameCode: nameCode,
        idUser: idUser
      })
      .lean()
      .exec();

    if (existedVocabulary) return true;
    return false;
  }

  
}
