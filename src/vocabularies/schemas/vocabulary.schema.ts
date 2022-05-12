import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { listBoxId } from '../dto/create-vocabulary.dto';

export type VocabularyDocument = Vocabulary & Document;

@Schema({
  id: true,
  timestamps: true,
})
export class Vocabulary {

  @Prop({
    required: true,
  })
  nameCode: string;

  @Prop({
    isInteger: true,
    default: listBoxId[0],
  })
  idBox: number;

  @Prop({
    required: true,
  })
  idUser: string;

  idCate: string;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary)
VocabularySchema.plugin(paginate);