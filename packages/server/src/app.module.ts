import { Module } from '@nestjs/common';
import { BFLModule } from './bfl/bfl.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserController } from './user.controller';
import { TerminusInfoController } from './terminus.controller';
import { DataStoreService } from './datastore.service';

@Module({
  imports: [BFLModule, ScheduleModule.forRoot()],
  controllers: [UserController, TerminusInfoController],
  providers: [DataStoreService],
})
export class AppModule {}
