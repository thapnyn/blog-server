import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  id: true,
  timestamps: true,
})
export class User {

  name: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
    minlength: 8
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);