import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({
  id: true,
  timestamps: true,
})
export class Article {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({
    required: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  attachment: string;

  @Prop({
    default: 0
  })
  likeCount: number;

}

export const ArticleSchema = SchemaFactory.createForClass(Article);