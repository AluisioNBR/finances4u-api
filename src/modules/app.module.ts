/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { BlocksModule } from './blocks.module'
import { GoalsModule } from './goals.module'
import { SignModule } from './sign.module'
import { SupportModule } from './support.module'
import { TransactionsModule } from './transactions.module'
import { UserModule } from './user.module'

const configService = new ConfigService()
const clusterUser = configService.get<string>('CLUSTER_USER')
const clusterPassword = configService.get<string>('CLUSTER_PASSWORD')
const cluster = configService.get<string>('CLUSTER')

@Module({
	imports: [
		UserModule,
		SignModule,
		TransactionsModule,
		BlocksModule,
		GoalsModule,
		SupportModule,
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: `mongodb+srv://${clusterUser}:${clusterPassword}@${cluster}/finances4u?retryWrites=true&w=majority`,
				dbName: 'finances4u',
			}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
})
export class AppModule {}
