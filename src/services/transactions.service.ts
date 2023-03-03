/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Transaction, TransactionDocument } from 'src/schemas/transaction.schema';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>) {}

  async transaction(
    userId: mongoose.Schema.Types.ObjectId,
    name: string,
    value: number,
    type: 'Income' | 'Expense',
  ): Promise<Transaction> {
    if (typeof name != 'string')
      throw new InternalServerErrorException('Internal Server Error!', {
        cause: new Error(),
        description: 'Transaction name was not informed!',
      });

    const newTransaction = await this.transactionModel.create({
      owner: userId,
      name: name,
      value: value,
      type: type,
    })

    return newTransaction;
  }

  async getStatement(
    userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Transaction[]> {
    const statement = await this.transactionModel.find({ owner: userId });

    if (statement == null)
      throw new NotFoundException('Not Found!', {
        cause: new Error(),
        description: 'User not found!',
      });

    return statement;
  }

  async deleteStatement(userId: mongoose.Schema.Types.ObjectId,) {
    await this.transactionModel.deleteMany({ owner: userId });
  }
}
