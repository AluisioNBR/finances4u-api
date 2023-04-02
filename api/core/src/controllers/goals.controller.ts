import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { GoalsService } from '../services/goals.service'
import multer from 'multer'

const GoalsController = Router()
const service = new GoalsService()
const upload = multer()

GoalsController.post(
	'/user/:userId/goals/create',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { name, goalValue, currentValue, incrementRate } = req.query

		try {
			return res.json(
				await service.createGoal(
					id as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(goalValue as string),
					parseFloat(currentValue as string),
					parseInt(incrementRate as string)
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.patch(
	'/user/:userId/goals/:goalId/goalPic',
	upload.single('file'),
	async (req: Request, res: Response) => {
		const { userId, goalId } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId
		const file = req.file as Express.Multer.File

		try {
			return res.json(
				await service.uploadGoalPic(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId,
					file
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.get(
	'/user/:userId/goals',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId

		try {
			return res.json(
				await service.getGoals(id as mongoose.Schema.Types.ObjectId)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.get(
	'/user/:userId/goals/:goalId',
	async (req: Request, res: Response) => {
		const { userId, goalId } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId

		try {
			return res.json(
				await service.findGoal(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.patch(
	'/user/:userId/goals/:goalId/edit',
	async (req: Request, res: Response) => {
		const { userId, goalId } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId
		const { name, goalValue, incrementRate } = req.query

		try {
			return res.json(
				await service.editGoal(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(goalValue as string),
					parseInt(incrementRate as string)
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.patch(
	'/user/:userId/goals/:goalId/increment/:value',
	async (req: Request, res: Response) => {
		const { userId, goalId, value } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId

		try {
			return res.json(
				await service.changeGoalCurrentValue(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId,
					parseFloat(value as string),
					'Increment'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.patch(
	'/user/:userId/goals/:goalId/decrement/:value',
	async (req: Request, res: Response) => {
		const { userId, goalId, value } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId

		try {
			return res.json(
				await service.changeGoalCurrentValue(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId,
					parseFloat(value as string),
					'Decrement'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

GoalsController.delete(
	'/user/:userId/goals/:goalId/delete',
	async (req: Request, res: Response) => {
		const { userId, goalId } = req.params
		const id: unknown = userId,
			id_goal: unknown = goalId

		try {
			return res.json(
				await service.deleteGoal(
					id as mongoose.Schema.Types.ObjectId,
					id_goal as mongoose.Schema.Types.ObjectId
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

export { GoalsController }
