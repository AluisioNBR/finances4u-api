import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { SignController } from './controllers/sign.controller'

var app = express()

app.use('', SignController)

config()
;(async () => {
	await mongoose.connect(
		`mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER}/finances4u`
	)
	console.log('Mongo connected!')

	if (!module.parent) {
		app.listen(3000)
		console.log('Express started on port 3000')
	}
})()

export default app
