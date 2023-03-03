/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Doubt {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;

  @Prop({ required: true })
  doubt: string;

  @Prop({ default: '' })
  response: string;

  @Prop({ required: true, default: 'awaiting' })
  status: 'awaiting' | 'answered' | 'read';
}

export type DoubtDocument = HydratedDocument<Doubt>;

export const DoubtSchema = SchemaFactory.createForClass(Doubt);
