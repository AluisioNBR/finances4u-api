import mongoose from 'mongoose'
import { Request, Response, Router } from 'express'
import { BlocksService } from '../services/blocks.service'

const BlocksController = Router()
const service = new BlocksService()

BlocksController.post(
	'/user/:userId/blocks/create',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const { name, value } = req.query

		try {
			res.statusCode = 201
			return res.json(
				await service.createBlock(
					id as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(value as string)
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

BlocksController.get(
	'/user/:userId/blocks',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		try {
			return res.json(
				await service.getBlocks(id as mongoose.Schema.Types.ObjectId)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

BlocksController.patch(
	'/user/:userId/blocks/:blockId/edit',
	async (req: Request, res: Response) => {
		const { userId, blockId } = req.params
		const id: unknown = userId,
			id_block: unknown = blockId
		const { name, value } = req.query

		try {
			return res.json(
				await service.editBlock(
					id as mongoose.Schema.Types.ObjectId,
					id_block as mongoose.Schema.Types.ObjectId,
					name as string,
					parseFloat(value as string)
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

BlocksController.delete(
	'/user/:userId/blocks/:blockId/cancel',
	async (req: Request, res: Response) => {
		const { userId, blockId } = req.params
		const id: unknown = userId,
			id_block: unknown = blockId

		try {
			return res.json(
				await service.cancelBlock(
					id as mongoose.Schema.Types.ObjectId,
					id_block as mongoose.Schema.Types.ObjectId
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

export { BlocksController }
