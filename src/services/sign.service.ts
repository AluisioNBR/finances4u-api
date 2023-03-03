/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/schemas/user.schema';

@Injectable()
export class SignService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async signIn(username: string, password: string): Promise<User>{
    const userFinded = await this.userModel.findOne({ username: username, password: password })
    if(userFinded)
      return userFinded
    else
      throw new NotFoundException(
        'User not found!',
        { cause: new Error(), description: 'Invalid username or password!' }
      )
  }

  async signUp(username: string, email: string, password: string): Promise<User>{
    const isUserFinded = await this.userModel.findOne({ email: email })
    if(!isUserFinded)
      return this.userModel.create({
        username: username,
        email: email,
        password: password
      })
    else
      throw new BadRequestException(
        'Something bad happened!',
        { cause: new Error(), description: 'User has already been registered!' }
      )
  }
}
