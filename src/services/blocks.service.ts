/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Block, BlockDocument } from 'src/schemas/block.schema';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ) {}

  async createBlock(
    userId: mongoose.Schema.Types.ObjectId,
    name: string,
    value: number,
  ): Promise<Block> {
    return this.blockModel.create({
      owner: userId,
      name: name,
      value: value,
    });
  }

  async getBlocks(userId: mongoose.Schema.Types.ObjectId): Promise<Block[]> {
    console.log(userId);
    return await this.blockModel.find({ owner: userId });
  }

  async editBlock(
    userId: mongoose.Schema.Types.ObjectId,
    blockId: mongoose.Schema.Types.ObjectId,
    name: string,
    value: number,
  ): Promise<Block> {
    return await this.blockModel.findOneAndUpdate(
      { _id: blockId, owner: userId },
      { name: name, value: value },
      { new: true }
    );
  }

  async cancelBlock(
    userId: mongoose.Schema.Types.ObjectId,
    blockId: mongoose.Schema.Types.ObjectId,
  ): Promise<Block> {
    return await this.blockModel.findOneAndDelete({
      _id: blockId,
      owner: userId
    });
  }

  async deleteAllBlocks(userId: mongoose.Schema.Types.ObjectId,) {
    await this.blockModel.deleteMany({ owner: userId });
  }
}
