import mongoose, { Schema } from 'mongoose'

export const SugestionSchema = new Schema({
	owner: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },

	title: { required: true, type: String },

	sugestion: { required: true, type: String },

	response: { type: String, default: '' },

	status: { type: String, default: 'awaiting' },
})

export const SugestionModel = mongoose.model('sugestion', SugestionSchema)
