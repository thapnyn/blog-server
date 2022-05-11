import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VocabularyDocument = Vocabulary & Document;

@Schema({
  id: true,
  timestamps: true,
})
export class Vocabulary {

  @Prop({
    required: true,
    unique: true,
  })
  nameCode: string;

  @Prop({
    required: true,
  })
  idBox: string;

  @Prop({
    required: true,
    
  })
  idUser: string;

  idCate: string;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);