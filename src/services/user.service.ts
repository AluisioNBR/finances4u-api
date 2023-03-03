import {
	NotFoundException,
	Injectable,
	InternalServerErrorException,
	Inject,
	ForbiddenException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { AccountConfigType } from 'src/types/accountConfig.type'
import { UserDocument, User } from '../schemas/user.schema'
import { BlocksService } from './blocks.service'
import { GoalsService } from './goals.service'
import { TransactionsService } from './transactions.service'

@Injectable()
export class UserService {
	constructor(
		@Inject(ConfigService) private configService: ConfigService,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		@Inject(TransactionsService)
		private transactionsService: TransactionsService,
		@Inject(GoalsService) private goalsService: GoalsService,
		@Inject(BlocksService) private blocksService: BlocksService
	) {}

	async getUser(userId: mongoose.Schema.Types.ObjectId) {
		const user = await this.userModel.findById(userId)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return user
	}

	async cleanTransactionsValues(
		userId: mongoose.Schema.Types.ObjectId
	): Promise<boolean> {
		const user = await this.userModel.findByIdAndUpdate(userId, {
			$set: { incomes: 0, expenses: 0 },
		})

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		const isTransactionsCleaned = user.incomes == 0 && user.expenses == 0

		if (!isTransactionsCleaned)
			throw new InternalServerErrorException('Internal Server Error!', {
				cause: new Error(),
				description: 'Transactions could not be cleared!',
			})

		return true
	}

	async changeUsername(
		userId: mongoose.Schema.Types.ObjectId,
		newUsername: string
	): Promise<User> {
		const user = await this.userModel
			.findByIdAndUpdate(userId, { username: newUsername }, { new: true })
			.exec()

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return user
	}

	async changeUserConfig(
		userId: mongoose.Schema.Types.ObjectId,
		config: 'autoIncrement' | 'blocksEdit'
	): Promise<User> {
		const user = await this.userModel.findById(userId)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		const userCurrentConfig = user.accountConfig as AccountConfigType

		return await this.userModel
			.findByIdAndUpdate(
				userId,
				{
					accountConfig: {
						autoIncrement:
							config == 'autoIncrement'
								? !userCurrentConfig.autoIncrement
								: userCurrentConfig.autoIncrement,
						blocksEdit:
							config == 'blocksEdit'
								? !userCurrentConfig.blocksEdit
								: userCurrentConfig.blocksEdit,
					},
				},
				{ new: true }
			)
			.exec()
	}

	async uploadProfilePic(
		userId: mongoose.Schema.Types.ObjectId,
		profilePic: Express.Multer.File
	): Promise<User> {
		if (profilePic.size > 10000000) throw new InternalServerErrorException()
		const fileBase64 = profilePic.buffer.toString('base64')

		const user = this.userModel.findByIdAndUpdate(
			userId,
			{ profilePic: fileBase64 },
			{ new: true }
		)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return user
	}

	async deleteUser(userId: mongoose.Schema.Types.ObjectId): Promise<User> {
		await this.transactionsService.deleteStatement(userId)
		await this.goalsService.deleteAllGoals(userId)
		await this.blocksService.deleteAllBlocks(userId)
		return await this.userModel.findByIdAndDelete(userId)
	}

	async giveAdm(
		userId: mongoose.Schema.Types.ObjectId,
		token: string
	): Promise<User> {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != this.configService.get<string>('TOKEN'))
			throw new ForbiddenException()

		const user = this.userModel.findByIdAndUpdate(
			userId,
			{ isAdm: true },
			{ new: true }
		)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return user
	}

	async removeAdm(
		userId: mongoose.Schema.Types.ObjectId,
		token: string
	): Promise<User> {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != this.configService.get<string>('TOKEN'))
			throw new ForbiddenException()

		const user = this.userModel.findByIdAndUpdate(
			userId,
			{ isAdm: false },
			{ new: true }
		)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return user
	}
}
