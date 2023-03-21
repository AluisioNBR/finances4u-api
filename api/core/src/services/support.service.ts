import { config } from 'dotenv'
import mongoose from 'mongoose'
import { DoubtModel } from '../schemas/doubt.schema'
import { SugestionModel } from '../schemas/sugestion.schema'

config()

export class SupportService {
	async sendDoubtOrSugestion(
		userId: mongoose.Schema.Types.ObjectId,
		content: string | string[],
		type: 'Doubt' | 'Sugestion'
	) {
		return this.createDoubtOrSugestion(userId, content, type)
	}

	private async createDoubtOrSugestion(
		userId: mongoose.Schema.Types.ObjectId,
		content: string | string[],
		type: 'Doubt' | 'Sugestion'
	) {
		if (type == 'Doubt')
			return await DoubtModel.create({
				owner: userId,
				doubt: content as string,
			})
		else
			return await SugestionModel.create({
				owner: userId,
				title: content[0],
				sugestion: content[1],
			})
	}

	async getDoubtsOrSugestions(
		status: 'awaiting' | 'answered' | 'read',
		type: 'Doubt' | 'Sugestion',
		token: string
	) {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != process.env.TOKEN) throw new Error('Forbidden')

		const searchCondition = type != undefined ? { status: status } : {}
		if (type == 'Doubt') return await DoubtModel.find(searchCondition)
		else return await SugestionModel.find(searchCondition)
	}

	async getDoubtsOrSugestionsPerUser(
		userId: mongoose.Schema.Types.ObjectId,
		status: 'awaiting' | 'answered' | 'read',
		type: 'Doubt' | 'Sugestion'
	) {
		if (type == 'Doubt')
			return await DoubtModel.find({ owner: userId, status: status })
		else return await SugestionModel.find({ owner: userId, status: status })
	}

	async answerDoubtOrSugestion(
		type: 'Doubt' | 'Sugestion',
		id: mongoose.Schema.Types.ObjectId,
		response: string,
		token: string
	) {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != process.env.TOKEN) throw new Error('Forbidden')
		const updateObject = {
			response: response,
			status: 'answered',
		}
		if (type == 'Doubt')
			return await DoubtModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
		else
			return await SugestionModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
	}

	async readDoubtOrSugestionAnswer(
		id: mongoose.Schema.Types.ObjectId,
		type: 'Doubt' | 'Sugestion'
	) {
		const updateObject = { status: 'read' }
		if (type == 'Doubt')
			return await DoubtModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
		else
			return await SugestionModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
	}
}
