import { config } from 'dotenv'
import { UserModel } from '../schemas/user.schema'
import { TransactionsService } from './transactions.service'
import { GoalsService } from './goals.service'
import { BlocksService } from './blocks.service'
import mongoose from 'mongoose'
import { AccountConfigType } from '../types/accountConfig.type'

config()

export class UserService {
	constructor() {
		this.transactionsService = new TransactionsService()
		this.goalsService = new GoalsService()
		this.blocksService = new BlocksService()
	}

	private transactionsService: TransactionsService
	private goalsService: GoalsService
	private blocksService: BlocksService

	async getUser(userId: mongoose.Schema.Types.ObjectId) {
		const user = await UserModel.findById(userId)

		if (user == null) throw new Error('User not found!')

		return user
	}

	async cleanTransactionsValues(userId: mongoose.Schema.Types.ObjectId) {
		const user = await UserModel.findByIdAndUpdate(userId, {
			$set: { incomes: 0, expenses: 0 },
		})

		if (user == null) throw new Error('User not found!')

		if (!this.isTransactionsCleaned(user.incomes, user.expenses))
			throw new Error('Transactions could not be cleared!')

		return true
	}

	private isTransactionsCleaned(incomes: number, expenses: number) {
		return incomes == 0 && expenses == 0
	}

	async changeUsername(
		userId: mongoose.Schema.Types.ObjectId,
		newUsername: string
	) {
		const user = await UserModel.findByIdAndUpdate(
			userId,
			{ username: newUsername },
			{ new: true }
		).exec()

		if (user == null) throw new Error('User not found!')

		return user
	}

	async changeUserConfig(
		userId: mongoose.Schema.Types.ObjectId,
		config: 'autoIncrement' | 'blocksEdit'
	) {
		const user = await UserModel.findById(userId)

		if (user == null) throw new Error('User not found!')

		const userCurrentConfig = user.accountConfig as AccountConfigType

		return await UserModel.findByIdAndUpdate(
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
		).exec()
	}

	async uploadProfilePic(
		userId: mongoose.Schema.Types.ObjectId,
		profilePic: Express.Multer.File
	) {
		if (profilePic.size > 10000000) throw new Error('Internal Server Error')
		const fileBase64 = profilePic.buffer.toString('base64')

		const user = UserModel.findByIdAndUpdate(
			userId,
			{ profilePic: fileBase64 },
			{ new: true }
		)

		if (user == null) throw new Error('User not found!')

		return user
	}

	async deleteUser(userId: mongoose.Schema.Types.ObjectId) {
		await this.transactionsService.deleteStatement(userId)
		await this.goalsService.deleteAllGoals(userId)
		await this.blocksService.deleteAllBlocks(userId)

		const user = await UserModel.findByIdAndDelete(userId)

		if (user == null) throw new Error('User not found!')

		return user
	}

	async changeAdm(
		userId: mongoose.Schema.Types.ObjectId,
		token: string,
		operation: 'give' | 'remove'
	) {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != process.env.TOKEN) throw new Error('Forbidden')

		const user = UserModel.findByIdAndUpdate(
			userId,
			{ isAdm: operation == 'give' },
			{ new: true }
		)

		if (user == null) throw new Error('User not found!')

		return user
	}
}
