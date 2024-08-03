import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyChangerService } from './money-changer.service';
import { MoneyChangerController } from './money-changer.controller';
import { Denomination } from './entities/denomination.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Denomination, Transaction])],
  providers: [MoneyChangerService],
  controllers: [MoneyChangerController],
  exports: [MoneyChangerService],
})
export class MoneyChangerModule {}
