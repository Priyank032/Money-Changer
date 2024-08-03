import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MoneyChangerService } from '../money-changer/money-changer.service';

@Injectable()
export class TasksService {
  constructor(private readonly moneyChangerService: MoneyChangerService) {}

  @Cron('0 0 * * *')
  async handleCron() {
    await this.moneyChangerService.resetDenominations();
  }
}
