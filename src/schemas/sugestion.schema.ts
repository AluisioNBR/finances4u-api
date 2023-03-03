/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Sugestion {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  sugestion: string;

  @Prop({ default: '' })
  response: string;

  @Prop({ required: true, default: 'awaiting' })
  status: 'awaiting' | 'answered' | 'read';
}

export type SugestionDocument = HydratedDocument<Sugestion>;

export const SugestionSchema = SchemaFactory.createForClass(Sugestion);
