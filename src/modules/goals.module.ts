/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsController } from 'src/controllers/goals.controller';
import { Goal, GoalSchema } from 'src/schemas/goals.schema';
import { GoalsService } from 'src/services/goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema,
      },
    ]),
  ],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports: [GoalsService]
})
export class GoalsModule {}
