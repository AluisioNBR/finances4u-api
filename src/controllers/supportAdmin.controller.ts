/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Patch } from '@nestjs/common';
import mongoose from 'mongoose';
import { SupportService } from 'src/services/support.service';

@Controller('admin/support')
export class SupportAdminController {
  constructor(private supportService: SupportService) {}

  @Get(':type/:status/:token')
  async getDoubtsOrSugestions(
    @Param('type') type: 'Doubt' | 'Sugestion',
    @Param('status') status: 'awaiting' | 'answered' | 'read',
    @Param('token') token: string,
  ) {
    return await this.supportService.getDoubtsOrSugestions(status, type, token);
  }

  @Patch('answer/:type/:id/:response/:token')
  async answerDoubtOrSugestion(
    @Param('type') type: 'Doubt' | 'Sugestion',
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Param('response') response: string,
    @Param('token') token: string,
  ) {
    return await this.supportService.answerDoubtOrSugestion(type, id, response, token);
  }
}
