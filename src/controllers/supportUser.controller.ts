/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { SupportService } from 'src/services/support.service';

@Controller('user/:userId/support')
export class SupportUserController {
  constructor(private supportService: SupportService) {}

  @Post('send/doubt')
  async sendDoubt(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('doubt') doubt: string,
  ) {
    return await this.supportService.sendDoubtOrSugestion(
      userId,
      doubt,
      'Doubt',
    );
  }

  @Post('send/sugestion')
  async sendSugestion(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('title') title: string,
    @Query('body') body: string,
  ) {
    return await this.supportService.sendDoubtOrSugestion(
      userId,
      [title, body],
      'Sugestion',
    );
  }

  @Get(':type/:status')
  async getDoubtsOrSugestionsPerUser(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('type') type: 'Doubt' | 'Sugestion',
    @Param('status') status: 'awaiting' | 'answered' | 'read',
  ) {
    return await this.supportService.getDoubtsOrSugestionsPerUser(
      userId,
      status,
      type,
    );
  }

  @Patch('read/:type/:id')
  async readDoubtOrSugestionAnswer(
    @Param('type') type: 'Doubt' | 'Sugestion',
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.supportService.readDoubtOrSugestionAnswer(id, type);
  }
}
