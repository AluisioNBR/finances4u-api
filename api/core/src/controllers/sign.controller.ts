import express, { Request, Response } from 'express'
import { SignService } from '../services/sign.service'

const SignController = express.Router()
const service = new SignService()

SignController.post('/signin', async (req: Request, res: Response) => {
	const { username, password } = req.query
	try {
		res.statusCode = 201
		return res.json(
			await service.signIn(username as string, password as string)
		)
	} catch (error) {
		res.statusCode = 404
	}
})

SignController.post('/signup', async (req: Request, res: Response) => {
	const { username, email, password } = req.query
	try {
		res.statusCode = 202
		return res.json(
			await service.signUp(
				username as string,
				email as string,
				password as string
			)
		)
	} catch (error) {
		res.statusCode = 400
	}
})

export { SignController }
