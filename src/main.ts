/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { AppModule } from './modules/app.module'

config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(process.env.PORT ? process.env.PORT : 3000)
}
bootstrap()
