/* eslint-disable prettier/prettier */
import { Controller, HttpCode, Post, Query, Header } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { SignService } from 'src/services/sign.service';

@Controller()
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Post('signin')
  @HttpCode(202)
  @Header('Access-Control-Allow-Origin', '*')
  @Header(
    'Access-Control-Allow-Methods',
    'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  )
  @Header(
    'Access-Control-Allow-Headers',
    'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
  )
  async signIn(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<User> {
    return this.signService.signIn(username, password);
  }

  @Post('signup')
  @HttpCode(202)
  async signUp(
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<User> {
    return this.signService.signUp(username, email, password);
  }
}
