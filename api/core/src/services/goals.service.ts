import { config } from 'dotenv'
import mongoose from 'mongoose'
import { GoalModel } from '../schemas/goal.schema'
import { UserModel } from '../schemas/user.schema'

config()

export class GoalsService {
	async createGoal(
		userId: mongoose.Schema.Types.ObjectId,
		name: string,
		goalValue: number,
		currentValue: number,
		incrementRate: number
	) {
		const user = await UserModel.findByIdAndUpdate(
			userId,
			{
				$inc: { incrementRateAvailable: -1 * incrementRate },
			},
			{ new: true }
		)

		if (user == null) throw new Error('User not found!')

		return await GoalModel.create({
			owner: userId,
			name: name,
			goalValue: goalValue,
			currentValue: currentValue,
			incrementRate: incrementRate,
		})
	}

	async uploadGoalPic(
		userId: mongoose.Schema.Types.ObjectId,
		goalId: mongoose.Schema.Types.ObjectId,
		goalPic: Express.Multer.File
	) {
		if (goalPic.size > 10000000) throw new Error('Internal Server Error')
		const fileBase64 = goalPic.buffer.toString('base64')

		const goal = GoalModel.findOneAndUpdate(
			{ owner: userId, _id: goalId },
			{ goalPic: fileBase64 },
			{ new: true }
		)

		if (goal == null) throw new Error('Goal not found!')

		return goal
	}

	async getGoals(userId: mongoose.Schema.Types.ObjectId) {
		return await GoalModel.find({ owner: userId })
	}

	async findGoal(
		userId: mongoose.Schema.Types.ObjectId,
		goalId: mongoose.Schema.Types.ObjectId
	) {
		return await GoalModel.findOne({ owner: userId, _id: goalId })
	}

	async editGoal(
		userId: mongoose.Schema.Types.ObjectId,
		goalId: mongoose.Schema.Types.ObjectId,
		name: string,
		goalValue: number,
		incrementRate: number
	) {
		return await GoalModel.findOneAndUpdate(
			{ owner: userId, _id: goalId },
			{
				$set: {
					name: name,
					goalValue: goalValue,
					incrementRate: incrementRate,
				},
			},
			{ new: true }
		)
	}

	async changeGoalCurrentValue(
		userId: mongoose.Schema.Types.ObjectId,
		goalId: mongoose.Schema.Types.ObjectId,
		value: number,
		type: 'Increment' | 'Decrement'
	) {
		return await GoalModel.findOneAndUpdate(
			{ owner: userId, _id: goalId },
			{
				$inc: { currentValue: type == 'Increment' ? value : -1 * value },
			},
			{ new: true }
		)
	}

	async deleteGoal(
		userId: mongoose.Schema.Types.ObjectId,
		goalId: mongoose.Schema.Types.ObjectId
	) {
		return await GoalModel.findOneAndDelete({ owner: userId, _id: goalId })
	}

	async deleteAllGoals(userId: mongoose.Schema.Types.ObjectId) {
		await GoalModel.deleteMany({ owner: userId })
	}
}
