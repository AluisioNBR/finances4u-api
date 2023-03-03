/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportAdminController } from 'src/controllers/supportAdmin.controller';
import { SupportUserController } from 'src/controllers/supportUser.controller';
import { Doubt, DoubtSchema } from 'src/schemas/doubt.schema';
import { Sugestion, SugestionSchema } from 'src/schemas/sugestion.schema';
import { SupportService } from 'src/services/support.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doubt.name, schema: DoubtSchema },
      { name: Sugestion.name, schema: SugestionSchema },
    ]),
    UserModule,
  ],
  controllers: [SupportUserController, SupportAdminController],
  providers: [SupportService],
})
export class SupportModule {}
