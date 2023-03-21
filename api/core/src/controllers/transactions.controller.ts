import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { TransactionsService } from '../services/transactions.service'

const TransactionsController = Router()
const service = new TransactionsService()

TransactionsController.get(
	'/user/:userId/statement',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId

		try {
			return res.json(
				await service.getStatement(id as mongoose.Schema.Types.ObjectId)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

TransactionsController.post(
	'/user/:userId/statement/register/receipt',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { name, value } = req.query

		try {
			return res.json(
				await service.transaction(
					id as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(value as string),
					'Income'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

TransactionsController.post(
	'/user/:userId/statement/register/payment',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { name, value } = req.query

		try {
			return res.json(
				await service.transaction(
					id as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(value as string),
					'Expense'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

export { TransactionsController }
