import { IsNotEmpty, Min, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeRequestDto {
  @ApiProperty({
    description: 'Mobile number of the user requesting change',
    example: '9876543210',
  })
  @IsNotEmpty()
  @Matches(/^[6-9]\d{9}$/, {
    message:
      'Mobile number must be a valid 10-digit number starting with 6, 7, 8, or 9',
  })
  mobileNumber: string;

  @ApiProperty({
    description: 'Amount for which change is requested',
    example: 53,
  })
  @IsNotEmpty()
  @Min(10)
  amount: number;
}
