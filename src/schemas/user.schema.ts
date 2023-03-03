/* eslint-disable prettier/prettier */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Buffer })
  profilePic: unknown;

  @Prop({ type: Number, required: true, default: 0 })
  balance: number;

  @Prop({ type: Number, required: true, default: 100 })
  incrementRateAvailable: number;

  @Prop({ type: Number, required: true, default: 0 })
  incomes: number;

  @Prop({ type: Number, required: true, default: 0 })
  expenses: number;

  @Prop({ required: true, default: false })
  isAdm: boolean;

  @Prop(
    raw({
      type: {
        autoIncrement: Boolean,
        blocksEdit: Boolean,
      },
      required: true,
      default: {
        autoIncrement: true,
        blocksEdit: false,
      },
    }),
  )
  accountConfig: Record<string, any>;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
