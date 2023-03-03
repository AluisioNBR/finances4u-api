/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { Transaction } from 'src/schemas/transaction.schema';
import { TransactionsService } from 'src/services/transactions.service';

@Controller('user/:userId/statement')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getStatement(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Transaction[]> {
    return await this.transactionsService.getStatement(userId);
  }

  @Post('register/receipt')
  async registerReceipt(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('value') value: number,
  ): Promise<Transaction> {
    console.log('Entrei');
    return await this.transactionsService.transaction(
      userId,
      name,
      value,
      'Income',
    );
  }

  @Post('register/payment')
  async registerPayment(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('value') value: number,
  ): Promise<Transaction> {
    return await this.transactionsService.transaction(
      userId,
      name,
      value,
      'Expense',
    );
  }
}
