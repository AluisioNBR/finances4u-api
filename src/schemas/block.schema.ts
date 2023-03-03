/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Block {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;
}

export type BlockDocument = HydratedDocument<Block>;

export const BlockSchema = SchemaFactory.createForClass(Block);
