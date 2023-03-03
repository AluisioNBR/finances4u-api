/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Transaction {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner: User;

  @Prop({ required: true })
  type: 'Income' | 'Expense';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, default: Date.now() })
  timestamp: number;
}

export type TransactionDocument = HydratedDocument<Transaction>;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
