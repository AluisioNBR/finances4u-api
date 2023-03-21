import mongoose from 'mongoose'
import { BlockModel } from '../schemas/block.schema'

export class BlocksService {
	async createBlock(
		userId: mongoose.Schema.Types.ObjectId,
		name: string,
		value: number
	) {
		return BlockModel.create({
			owner: userId,
			name: name,
			value: value,
		})
	}

	async getBlocks(userId: mongoose.Schema.Types.ObjectId) {
		return await BlockModel.find({ owner: userId })
	}

	async editBlock(
		userId: mongoose.Schema.Types.ObjectId,
		blockId: mongoose.Schema.Types.ObjectId,
		name: string,
		value: number
	) {
		return await BlockModel.findOneAndUpdate(
			{ _id: blockId, owner: userId },
			{ name: name, value: value },
			{ new: true }
		)
	}

	async cancelBlock(
		userId: mongoose.Schema.Types.ObjectId,
		blockId: mongoose.Schema.Types.ObjectId
	) {
		const block = await BlockModel.findOneAndDelete({
			_id: blockId,
			owner: userId,
		})
		if (block == null) throw new Error('Not found')
		return block
	}

	async deleteAllBlocks(userId: mongoose.Schema.Types.ObjectId) {
		await BlockModel.deleteMany({ owner: userId })
	}
}
