import mongoose, { Schema } from 'mongoose'

export const GoalSchema = new Schema({
	name: { required: true, type: String },

	goalValue: { required: true, type: Number },

	currentValue: { required: true, type: Number },

	incrementRate: { required: true, type: Number },

	goalPic: { type: String, default: '' },

	owner: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
})

export const GoalModel = mongoose.model('goal', GoalSchema)
