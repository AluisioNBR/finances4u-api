/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Goal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  goalValue: number;

  @Prop({ required: true })
  currentValue: number;

  @Prop({ required: true })
  incrementRate: number;

  @Prop({ type: Buffer })
  goalPic: unknown;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;
}

export type GoalDocument = HydratedDocument<Goal>;

export const GoalSchema = SchemaFactory.createForClass(Goal);
