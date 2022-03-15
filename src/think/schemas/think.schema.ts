import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ThinkDocument = Think & Document;

@Schema({
  id: true,
  timestamps: true,
})
export class Think {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop()
  userAgent: string;
}

export const ThinkSchema = SchemaFactory.createForClass(Think);