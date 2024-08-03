import { IsNotEmpty, IsMobilePhone, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionRequestDto {
  @ApiProperty({
    description: 'Mobile number of the user',
    example: '9876543210',
  })
  @IsNotEmpty()
  @IsMobilePhone('en-IN', { strictMode: false })
  mobileNumber: string;

  @ApiProperty({
    description: 'Start date for the transaction query',
    example: '2024-07-19T00:00:00Z',
    type: String,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'End date for the transaction query',
    example: '2024-07-22T23:59:59Z',
    type: String,
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
