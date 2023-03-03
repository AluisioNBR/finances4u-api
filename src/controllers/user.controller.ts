import {
  Controller,
  HttpCode,
  Param,
  Get,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('user/:userId')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Patch('transactions/clean')
  @HttpCode(204)
  async cleanTransactionsValues(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ) {
    this.userService.cleanTransactionsValues(userId);
  }

  @Patch('change/username/:newUsername')
  @HttpCode(202)
  async changeUsername(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('newUsername') newUsername: string,
  ): Promise<User> {
    return await this.userService.changeUsername(userId, newUsername);
  }

  @Patch('change/autoIncrement/')
  @HttpCode(202)
  async changeAutoIncrement(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    return await this.userService.changeUserConfig(userId, 'autoIncrement');
  }

  @Patch('change/blocksEdit/')
  @HttpCode(202)
  async changeBlocksEdit(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    return await this.userService.changeUserConfig(userId, 'blocksEdit');
  }

  @Post('profilePic')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePic(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
  ): Promise<User> {
    return await this.userService.uploadProfilePic(userId, file);
  }

  @Delete('delete')
  async deleteUser(@Param('userId') userId: mongoose.Schema.Types.ObjectId) {
    return await this.userService.deleteUser(userId);
  }

  @Patch('addAdmin/:token')
  async addAdmin(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('token') token: string,
  ) {
    return await this.userService.giveAdm(userId, token);
  }

  @Patch('removeAdmin/:token')
  async removeAdmin(
    @Param('userId') userId: mongoose.Schema.Types.ObjectId,
    @Param('token') token: string,
  ) {
    return await this.userService.removeAdm(userId, token);
  }
}
