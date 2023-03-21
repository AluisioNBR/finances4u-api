import mongoose, { Schema } from 'mongoose'

export const BlockSchema = new Schema({
	name: { required: true, type: String },

	value: { required: true, type: Number },

	owner: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})

export const BlockModel = mongoose.model('block', BlockSchema)
