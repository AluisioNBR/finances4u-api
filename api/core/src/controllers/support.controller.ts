import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { SupportService } from '../services/support.service'

const SupportController = Router()
const service = new SupportService()

SupportController.get(
	'/admin/support/:type/:status/:token',
	async (req: Request, res: Response) => {
		const { type, status, token } = req.params
		try {
			return res.json(
				await service.getDoubtsOrSugestions(
					status as 'awaiting' | 'answered' | 'read',
					type as 'Doubt' | 'Sugestion',
					token as string
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

SupportController.patch(
	'/admin/support/answer/:type/:id/:response/:token',
	async (req: Request, res: Response) => {
		const { type, id, response, token } = req.params
		const itemId: unknown = id
		try {
			return res.json(
				await service.answerDoubtOrSugestion(
					type as 'Doubt' | 'Sugestion',
					itemId as mongoose.Schema.Types.ObjectId,
					response as string,
					token as string
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

SupportController.post(
	'/user/:userId/support/send/doubt',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { doubt } = req.query
		try {
			return res.json(
				await service.sendDoubtOrSugestion(
					id as mongoose.Schema.Types.ObjectId,
					doubt as string,
					'Doubt'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

SupportController.post(
	'/user/:userId/support/send/sugestion',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { title, body } = req.query
		try {
			return res.json(
				await service.sendDoubtOrSugestion(
					id as mongoose.Schema.Types.ObjectId,
					[title as string, body as string],
					'Sugestion'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

SupportController.get(
	'/user/:userId/support/:type/:status',
	async (req: Request, res: Response) => {
		const { userId, type, status } = req.params
		const id: unknown = userId
		try {
			return res.json(
				await service.getDoubtsOrSugestionsPerUser(
					id as mongoose.Schema.Types.ObjectId,
					status as 'awaiting' | 'answered' | 'read',
					type as 'Doubt' | 'Sugestion'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

SupportController.patch(
	'/user/:userId/support/read/:type/:id',
	async (req: Request, res: Response) => {
		const { type, id } = req.params
		const itemId: unknown = id
		try {
			return res.json(
				await service.readDoubtOrSugestionAnswer(
					itemId as mongoose.Schema.Types.ObjectId,
					type as 'Doubt' | 'Sugestion'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

export { SupportController }
