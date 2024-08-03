import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MoneyChangerModule } from './money-changer/money-changer.module';
import { TasksModule } from './tasks/tasks.module';
import { Denomination } from './money-changer/entities/denomination.entity';
import { Transaction } from './money-changer/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql'
      host: 'localhost',
      port: 5432, // for PostgreSQL, use 5432
      username: 'postgres',
      password: 'admin123',
      database: 'money_changer',
      entities: [Denomination, Transaction],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    MoneyChangerModule,
    TasksModule,
  ],
})
export class AppModule {}
