import mongoose, { Schema } from 'mongoose'

export const DoubtSchema = new Schema({
	doubt: { required: true, type: String },

	response: { type: String, default: '' },

	status: { type: String, default: 'awaiting' },

	owner: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})

export const DoubtModel = mongoose.model('doubt', DoubtSchema)
