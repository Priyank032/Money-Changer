import { Entity, Column, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Denomination extends BaseEntity {
  @ApiProperty({ description: 'Denomination value', example: 20 })
  @Column({ name: 'Denomination', type: 'int', unique: true })
  denomination: number;

  @ApiProperty({ description: 'Count of the denomination available', example: 10000 })
  @Column({ name: 'Count', type: 'int', default: 0 })
  count: number;
}
