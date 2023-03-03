/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignController } from 'src/controllers/sign.controller';
import { User } from 'src/schemas/user.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { SignService } from 'src/services/sign.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SignController],
  providers: [SignService],
})
export class SignModule {}
