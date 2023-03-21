import { UserModel } from '../schemas/user.schema'

export class SignService {
	async signIn(username: string, password: string) {
		const userFinded = await UserModel.findOne({
			username: username,
			password: password,
		})

		if (!userFinded) throw new Error('User not found!')

		return userFinded
	}
	async signUp(username: string, email: string, password: string) {
		const isUserFinded = await UserModel.findOne({ email: email })

		if (isUserFinded) throw new Error('User has already been registered!')

		return UserModel.create({
			username: username,
			email: email,
			password: password,
		})
	}
}
