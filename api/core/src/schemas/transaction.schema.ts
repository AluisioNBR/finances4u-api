import mongoose, { Schema } from 'mongoose'

export const TransactionSchema = new Schema({
	owner: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },

	type: { required: true, type: String },

	name: { required: true, type: String },

	value: { required: true, type: Number },

	timestamp: { required: true, type: Date, default: Date.now() },
})

export const TransactionModel = mongoose.model('transaction', TransactionSchema)
