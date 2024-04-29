import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [BackendController],
  providers: [],
})
export class BFLModule {}
