import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MoneyChangerModule } from '../money-changer/money-changer.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [ScheduleModule.forRoot(), MoneyChangerModule],
  providers: [TasksService],
})
export class TasksModule {}
