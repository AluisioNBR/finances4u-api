/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.service'
import { UserSchema, User } from '../schemas/user.schema'
import { TransactionsModule } from './transactions.module'
import { GoalsModule } from './goals.module'
import { BlocksModule } from './blocks.module'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		TransactionsModule,
		GoalsModule,
		BlocksModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
