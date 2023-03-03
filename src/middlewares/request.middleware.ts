/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		)
		next()
	}
}
