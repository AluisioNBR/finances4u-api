/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { Goal } from 'src/schemas/goals.schema';
import { GoalsService } from 'src/services/goals.service';

@Controller('user/:userId/goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post('create')
  async createGoal(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('goalValue') goalValue: number,
    @Query('currentValue') currentValue: number,
    @Query('incrementRate') incrementRate: number,
  ): Promise<Goal> {
    console.log('entrei')
    return await this.goalsService.createGoal(
      userId,
      name,
      goalValue,
      currentValue,
      incrementRate,
    );
  }

  @Post(':goalId/uploadGoalPic')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGoalPic(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Goal> {
    return await this.goalsService.uploadGoalPic(userId, goalId, file);
  }

  @Get()
  async getGoals(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<Goal[]> {
    return await this.goalsService.getGoals(userId);
  }

  @Get(':goalId')
  async findGoal(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
  ): Promise<Goal> {
    return await this.goalsService.findGoal(userId, goalId);
  }

  @Patch(':goalId/edit')
  async editGoal(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
    @Query('name') name: string,
    @Query('goalValue') goalValue: number,
    @Query('incrementRate') incrementRate: number,
  ): Promise<Goal> {
    return await this.goalsService.editGoal(
      userId,
      goalId,
      name,
      goalValue,
      incrementRate,
    );
  }

  @Patch(':goalId/increment/:value')
  async incrementGoalCurrentValue(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
    @Param('value') value: number,
  ): Promise<Goal> {
    return await this.goalsService.changeGoalCurrentValue(userId, goalId, value, 'Increment');
  }

  @Patch(':goalId/decrement/:value')
  async decrementGoalCurrentValue(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
    @Param('value') value: number,
  ): Promise<Goal> {
    return await this.goalsService.changeGoalCurrentValue(userId, goalId, value, 'Decrement');
  }

  @Delete(':goalId/delete')
  async goalDelete(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('goalId') goalId: mongoose.Schema.Types.ObjectId,
  ): Promise<Goal> {
    return await this.goalsService.deleteGoal(userId, goalId);
  }
}
