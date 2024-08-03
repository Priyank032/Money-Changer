import { IsInt, Min } from 'class-validator';

export class CreateDenominationDto {
  @IsInt()
  @Min(1)
  denomination: number;

  @IsInt()
  @Min(0)
  count: number;
}
