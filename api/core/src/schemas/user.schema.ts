import mongoose, { Schema } from 'mongoose'

export const UserSchema = new Schema({
	username: { required: true, type: String },

	email: { required: true, type: String },

	password: { required: true, type: String },

	profilePic: { type: String, default: '' },

	balance: { type: Number, required: true, default: 0 },

	incrementRateAvailable: { type: Number, required: true, default: 100 },

	incomes: { type: Number, required: true, default: 0 },

	expenses: { type: Number, required: true, default: 0 },

	isAdm: { type: Boolean, required: true, default: false },

	accountConfig: {
		type: {
			autoIncrement: Boolean,
			blocksEdit: Boolean,
		},
		required: true,
		default: {
			autoIncrement: true,
			blocksEdit: false,
		},
	},
})

export const UserModel = mongoose.model('user', UserSchema)
