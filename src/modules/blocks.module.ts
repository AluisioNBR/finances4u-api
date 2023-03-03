/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlocksController } from '../controllers/blocks.controller';
import { BlocksService } from '../services/blocks.service';
import { Block, BlockSchema } from 'src/schemas/block.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Block.name, schema: BlockSchema }])],
  controllers: [BlocksController],
  providers: [BlocksService],
  exports: [BlocksService]
})
export class BlocksModule {}
