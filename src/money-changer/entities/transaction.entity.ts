import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TransactionStatus } from '../../../utils/enums/transaction-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction extends BaseEntity {

  @Column({ name:"Mobile Number",type: 'varchar', length: 10 })
  @ApiProperty({ description: 'Mobile number of the user', example: '9876543210' })
  mobileNumber: string;

  @Column({name : 'Amount Requested', type : 'int', nullable : false})
  @ApiProperty({ description: 'Amount requested for change', example: 53 })
  amountRequested: number;

  @Column({ name : 'Status',type: 'enum', enum: TransactionStatus })
  @ApiProperty({ description: 'Status of the transaction', enum: TransactionStatus })
  status: TransactionStatus;

  @Column({ name : 'Remarks',type: 'text' })
  @ApiProperty({ description: 'Remarks of the transaction', example: 'SUCCESS' })
  remarks: string;
}
