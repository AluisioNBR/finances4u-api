import { Request, Response, Router } from 'express'
import { SignService } from '../services/sign.service'

const SignController = Router()
const service = new SignService()

SignController.post('/signin', async (req: Request, res: Response) => {
	const { username, password } = req.query
	try {
		res.statusCode = 202
		return res.json(
			await service.signIn(username as string, password as string)
		)
	} catch (error) {
		res.sendStatus(404)
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
		res.sendStatus(400)
	}
})

export { SignController }
