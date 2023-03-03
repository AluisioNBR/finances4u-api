/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Goal, GoalDocument } from 'src/schemas/goals.schema';

@Injectable()
export class GoalsService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}

  async createGoal(
    userId: mongoose.Schema.Types.ObjectId,
    name: string,
    goalValue: number,
    currentValue: number,
    incrementRate: number,
  ) {
    console.log('Entrei')
    return await this.goalModel.create({
      owner: userId,
      name: name,
      goalValue: goalValue,
      currentValue: currentValue,
      incrementRate: incrementRate,
    });
  }

  async uploadGoalPic(
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
    goalPic: Express.Multer.File,
  ): Promise<Goal> {
    if (goalPic.size > 10000000) throw new InternalServerErrorException();
    const fileBase64 = goalPic.buffer.toString('base64');

    const goal = this.goalModel.findOneAndUpdate(
      { owner: userId, _id: goalId },
      { goalPic: fileBase64 },
      { new: true },
    );

    if (goal == null)
      throw new NotFoundException('Not Found!', {
        cause: new Error(),
        description: 'Goal not found!',
      });

    return goal;
  }

  async getGoals(userId: mongoose.Schema.Types.ObjectId): Promise<Goal[]> {
    return await this.goalModel.find({ owner: userId });
  }

  async findGoal(
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
  ): Promise<Goal> {
    return await this.goalModel.findOne({ owner: userId, _id: goalId });
  }

  async editGoal(
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
    name: string,
    goalValue: number,
    incrementRate: number,
  ): Promise<Goal> {
    return await this.goalModel.findOneAndUpdate(
      { owner: userId, _id: goalId },
      {
        $set: {
          name: name,
          goalValue: goalValue,
          incrementRate: incrementRate,
        },
      },
      { new: true },
    );
  }

  async changeGoalCurrentValue(
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
    value: number,
    type: 'Increment' | 'Decrement',
  ): Promise<Goal> {
    return await this.goalModel.findOneAndUpdate(
      { owner: userId, _id: goalId },
      {
        $inc: { currentValue: type == 'Increment' ? value : -1 * value },
      },
      { new: true },
    );
  }

  async deleteGoal(
    userId: mongoose.Schema.Types.ObjectId,
    goalId: mongoose.Schema.Types.ObjectId,
  ): Promise<Goal> {
    return await this.goalModel.findOneAndDelete({ owner: userId, _id: goalId });
  }

  async deleteAllGoals(userId: mongoose.Schema.Types.ObjectId,){
    await this.goalModel.deleteMany({ owner: userId });
  }
}
