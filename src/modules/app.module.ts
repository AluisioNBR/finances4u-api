/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BlocksModule } from './blocks.module'
import { GoalsModule } from './goals.module'
import { SignModule } from './sign.module'
import { SupportModule } from './support.module'
import { TransactionsModule } from './transactions.module'
import { UserModule } from './user.module'
import { config } from 'dotenv'

config()

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UserModule,
		SignModule,
		TransactionsModule,
		BlocksModule,
		GoalsModule,
		SupportModule,
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: `mongodb+srv://${process.env.CLUSTER_USER}:${process.env.CLUSTER_PASSWORD}@${process.env.CLUSTER}/finances4u`,
				dbName: 'finances4u',
			}),
		}),
	],
})
export class AppModule {}
