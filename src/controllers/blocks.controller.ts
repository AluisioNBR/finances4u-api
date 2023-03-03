/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import mongoose from 'mongoose';
import { Block } from 'src/schemas/block.schema';
import { BlocksService } from 'src/services/blocks.service';

@Controller('user/:userId/blocks')
export class BlocksController {
  constructor(private blocksService: BlocksService) {}

  @Post('create')
  async createBlock(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('value') value: number,
  ): Promise<Block> {
    return await this.blocksService.createBlock(userId, name, value);
  }

  @Get()
  async getBlocks(@Param('userId') userId: mongoose.Schema.Types.ObjectId) {
    return await this.blocksService.getBlocks(userId)
  }

  @Patch(':blockId/edit')
  async editBlock(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('blockId') blockId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('value') value: number,
  ) {
    return await this.blocksService.editBlock(userId, blockId, name, value);
  }

  @Delete(':blockId/cancel')
  async cancelBlock(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('blockId') blockId: mongoose.Schema.Types.ObjectId,
  ) {
    return await this.blocksService.cancelBlock(userId, blockId);
  }
}
