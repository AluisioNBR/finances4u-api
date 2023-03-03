/* eslint-disable prettier/prettier */
import {
	ForbiddenException,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { Doubt, DoubtDocument } from 'src/schemas/doubt.schema'
import { Sugestion, SugestionDocument } from 'src/schemas/sugestion.schema'
import { UserService } from './user.service'

@Injectable()
export class SupportService {
	constructor(
		@Inject(UserService) private userService: UserService,
		@Inject(ConfigService) private configService: ConfigService,
		@InjectModel(Doubt.name) private doubtModel: Model<DoubtDocument>,
		@InjectModel(Sugestion.name)
		private sugestionModel: Model<SugestionDocument>
	) {}

	async sendDoubtOrSugestion(
		userId: mongoose.Schema.Types.ObjectId,
		content: string | string[],
		type: 'Doubt' | 'Sugestion'
	) {
		const user = await this.userService.getUser(userId)

		if (user == null)
			throw new NotFoundException('Not Found!', {
				cause: new Error(),
				description: 'User not found!',
			})

		return this.createDoubtOrSugestion(userId, content, type)
	}

	private async createDoubtOrSugestion(
		userId: mongoose.Schema.Types.ObjectId,
		content: string | string[],
		type: 'Doubt' | 'Sugestion'
	) {
		if (type == 'Doubt')
			return await this.doubtModel.create({
				owner: userId,
				doubt: content as string,
			})
		else
			return await this.sugestionModel.create({
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
		if (finalToken != this.configService.get<string>('TOKEN'))
			throw new ForbiddenException()

		const searchCondition = type != undefined ? { status: status } : {}
		if (type == 'Doubt') return await this.doubtModel.find(searchCondition)
		else return await this.sugestionModel.find(searchCondition)
	}

	async getDoubtsOrSugestionsPerUser(
		userId: mongoose.Schema.Types.ObjectId,
		status: 'awaiting' | 'answered' | 'read',
		type: 'Doubt' | 'Sugestion'
	) {
		if (type == 'Doubt')
			return await this.doubtModel.find({ owner: userId, status: status })
		else
			return await this.sugestionModel.find({ owner: userId, status: status })
	}

	async answerDoubtOrSugestion(
		type: 'Doubt' | 'Sugestion',
		id: mongoose.Schema.Types.ObjectId,
		response: string,
		token: string
	) {
		const finalToken = parseInt(token, 16).toString()
		if (finalToken != this.configService.get<string>('TOKEN'))
			throw new ForbiddenException()
		const updateObject = {
			response: response,
			status: 'answered',
		}
		if (type == 'Doubt')
			return await this.doubtModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
		else
			return await this.sugestionModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
	}

	async readDoubtOrSugestionAnswer(
		id: mongoose.Schema.Types.ObjectId,
		type: 'Doubt' | 'Sugestion'
	): Promise<Sugestion> {
		const updateObject = { status: 'read' }
		if (type == 'Doubt')
			return await this.doubtModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
		else
			return await this.sugestionModel.findByIdAndUpdate(id, updateObject, {
				new: true,
			})
	}
}
