import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Denomination } from './entities/denomination.entity';
import { Transaction } from './entities/transaction.entity';
import { ChangeRequestDto } from './dto/change-request.dto';
import { CreateDenominationDto } from './dto/create-denomination.dto';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { TransactionStatus } from '../../utils/enums/transaction-status.enum';

@Injectable()
export class MoneyChangerService {
  constructor(
    @InjectRepository(Denomination)
    private denominationRepository: Repository<Denomination>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async requestChange(changeRequestDto: ChangeRequestDto): Promise<any> {
    const { mobileNumber, amount } = changeRequestDto;

    if (amount > 500) {
      await this.saveTransaction(
        mobileNumber,
        amount,
        TransactionStatus.FAILED,
        'Amount Exceeded',
      );

      throw new BadRequestException(
        'Invalid amount. Must be less than or equal to 500.',
      );
    }

    const denominations = await this.denominationRepository.find();
    const change = this.calculateChange(amount, denominations);

    if (!change) {
      await this.saveTransaction(
        mobileNumber,
        amount,
        TransactionStatus.FAILED,
        "'Denominations not available.'",
      );

      throw new BadRequestException('Denominations not available.');
    }

    await this.updateDenominations(change);
    const remarks = this.formatChange(change);
    await this.saveTransaction(
      mobileNumber,
      amount,
      TransactionStatus.SUCCESS,
      remarks,
    );
    return { data: change, message: 'Change Request Successfully Executed' };
  }

  async getCount(): Promise<any> {
    const denominations = await this.denominationRepository.find();
    const count = {};
    denominations.forEach((denom) => (count[denom.denomination] = denom.count));
    return { data: count, message: 'Denominations Fetched Successfully' };
  }

  async getTransactions(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<any> {
    const { mobileNumber, startDate, endDate } = transactionRequestDto;
    const userTransactions = await this.transactionRepository.find({
      where: {
        mobileNumber,
        createdAt: Between(startDate, endDate),
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      data: userTransactions,
      message: 'Transactions Fetched Successfully',
    };
  }

  async resetDenominations(): Promise<void> {
    await this.denominationRepository.update({}, { count: 10000 });
  }

  async addDenomination(
    createDenominationDto: CreateDenominationDto,
  ): Promise<Object> {
    const { denomination, count } = createDenominationDto;
    let denominationEntity = await this.denominationRepository.findOne({
      where: { denomination },
    });

    if (!denominationEntity) {
      denominationEntity = new Denomination();
      denominationEntity.denomination = denomination;
      denominationEntity.count = count;
    } else {
      denominationEntity.count += count;
    }

    const denominationData =
      await this.denominationRepository.save(denominationEntity);

    return {
      data: denominationData,
      message: 'Transactions Fetched Successfully',
    };
  }
  private calculateChange(amount: number, denominations: Denomination[]): any {
    const result = {};
    const sortedDenominations = denominations.sort(
      (a, b) => b.denomination - a.denomination,
    );

    for (const denom of sortedDenominations) {
      if (amount >= denom.denomination && denom.count > 0) {
        const numCoins = Math.min(
          Math.floor(amount / denom.denomination),
          denom.count,
        );
        if (numCoins > 0) {
          result[denom.denomination] = numCoins;
          amount -= denom.denomination * numCoins;
          if (amount === 0) break;
        }
      }
    }

    return amount === 0 ? result : null;
  }

  private async updateDenominations(change: any): Promise<void> {
    for (const denom in change) {
      await this.denominationRepository.decrement(
        { denomination: +denom },
        'count',
        change[denom],
      );
    }
  }

  private async saveTransaction(
    mobileNumber: string,
    amount: number,
    status: TransactionStatus,
    remarks: any,
  ): Promise<void> {
    const transaction = new Transaction();
    transaction.mobileNumber = mobileNumber;
    transaction.amountRequested = amount;
    transaction.status = status;
    transaction.remarks = JSON.stringify(remarks);
    await this.transactionRepository.save(transaction);
  }

  private formatChange(change: any): string {
    // Format the change object to a string representation for remarks
    return Object.entries(change)
      .map(([denomination, count]) => `${denomination}=${count}`)
      .join('|');
  }
}
