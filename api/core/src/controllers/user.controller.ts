import { Request, Response, Router } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import { UserService } from '../services/user.service'

const UserController = Router()
const service = new UserService()
const upload = multer()

UserController.get('/user/:userId', async (req: Request, res: Response) => {
	const { userId } = req.params
	const id: unknown = userId
	try {
		return res.json(await service.getUser(id as mongoose.Schema.Types.ObjectId))
	} catch (error) {
		res.sendStatus(404)
	}
})

UserController.patch(
	'/user/:userId/balance/movement/clean',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		try {
			res.statusCode = 204
			return res.json(
				await service.cleanTransactionsValues(
					id as mongoose.Schema.Types.ObjectId
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/change/username/:newUsername',
	async (req: Request, res: Response) => {
		const { userId, newUsername } = req.params
		const id: unknown = userId
		try {
			res.statusCode = 202
			return res.json(
				await service.changeUsername(
					id as mongoose.Schema.Types.ObjectId,
					newUsername
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/change/autoIncrement',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		try {
			res.statusCode = 202
			return res.json(
				await service.changeUserConfig(
					id as mongoose.Schema.Types.ObjectId,
					'autoIncrement'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/change/blocksEdit',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		try {
			res.statusCode = 202
			return res.json(
				await service.changeUserConfig(
					id as mongoose.Schema.Types.ObjectId,
					'blocksEdit'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/profilePic',
	upload.single('file'),
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		const file = req.file as Express.Multer.File

		try {
			return res.json(
				await service.uploadProfilePic(
					id as mongoose.Schema.Types.ObjectId,
					file
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.delete(
	'/user/:userId/delete',
	async (req: Request, res: Response) => {
		const { userId } = req.params
		const id: unknown = userId
		try {
			return res.json(
				await service.deleteUser(id as mongoose.Schema.Types.ObjectId)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/addAdmin/:token',
	async (req: Request, res: Response) => {
		const { userId, token } = req.params
		const id: unknown = userId
		try {
			return res.json(
				await service.changeAdm(
					id as mongoose.Schema.Types.ObjectId,
					token,
					'give'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

UserController.patch(
	'/user/:userId/removeAdmin/:token',
	async (req: Request, res: Response) => {
		const { userId, token } = req.params
		const id: unknown = userId
		try {
			return res.json(
				await service.changeAdm(
					id as mongoose.Schema.Types.ObjectId,
					token,
					'remove'
				)
			)
		} catch (error) {
			res.sendStatus(404)
		}
	}
)

export { UserController }
