import mongoose from 'mongoose'
import { TransactionModel } from '../schemas/transaction.schema'
import { UserModel } from '../schemas/user.schema'

export class TransactionsService {
	async transaction(
		userId: mongoose.Schema.Types.ObjectId,
		name: string,
		value: number,
		type: 'Income' | 'Expense'
	) {
		if (typeof name != 'string')
			throw new Error('Transaction name was not informed!')

		const user = await UserModel.findByIdAndUpdate(
			userId,
			{
				$inc: {
					balance: type == 'Income' ? value : value * -1,
					incomes: type == 'Income' ? value : 0,
					expenses: type == 'Expense' ? value : 0,
				},
			},
			{ new: true }
		).exec()

		if (user == null) throw new Error('User not found!')

		const newTransaction = await TransactionModel.create({
			owner: userId,
			name: name,
			value: value,
			type: type,
		})

		return newTransaction
	}

	async getStatement(userId: mongoose.Schema.Types.ObjectId) {
		const statement = await TransactionModel.find({ owner: userId })

		if (statement == null) throw new Error('User not found!')

		return statement
	}

	async deleteStatement(userId: mongoose.Schema.Types.ObjectId) {
		await TransactionModel.deleteMany({ owner: userId })
	}
}
