import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { BlocksController } from './controllers/blocks.controller'
import { GoalsController } from './controllers/goals.controller'
import { SignController } from './controllers/sign.controller'
import { SupportController } from './controllers/support.controller'
import { TransactionsController } from './controllers/transactions.controller'
import { UserController } from './controllers/user.controller'
import { CorsMiddleware } from './middlewares/cors.middleware'

var app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(CorsMiddleware)

app.use('', SignController)
app.use('', UserController)
app.use('', BlocksController)
app.use('', GoalsController)
app.use('', TransactionsController)
app.use('', SupportController)

config()
;(async () => {
	await mongoose.connect(`${process.env.CLUSTER}`)
	console.log('Mongo connected!')

	if (!module.parent) {
		const port = 3000
		app.listen(port)
		console.log(`Express started on port ${port}`)
	}
})()

export default app
