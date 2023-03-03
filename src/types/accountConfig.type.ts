/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';

export interface AccountConfigType {
  _id: mongoose.Schema.Types.ObjectId;
  autoIncrement: boolean;
  blocksEdit: boolean;
}
