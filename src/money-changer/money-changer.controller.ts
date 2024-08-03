import { Controller, Post, Get, Body,UsePipes, ValidationPipe ,UseInterceptors} from '@nestjs/common';
import { MoneyChangerService } from './money-changer.service';
import { ChangeRequestDto } from './dto/change-request.dto';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { CreateDenominationDto } from './dto/create-denomination.dto';
import { Denomination } from './entities/denomination.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';


@ApiTags('money-changer')
@Controller('money-changer')
@UseInterceptors(ResponseInterceptor)

export class MoneyChangerController {
  constructor(private readonly moneyChangerService: MoneyChangerService) {}

  @Post('change')
  @ApiOperation({ summary: 'Request change for a given amount' })
  @ApiResponse({ status: 201, description: 'The change has been successfully requested.' })
  @ApiResponse({ status: 400, description: 'Invalid input or insufficient denominations.' })
  async requestChange(@Body() changeRequestDto: ChangeRequestDto) {
    return this.moneyChangerService.requestChange(changeRequestDto);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get the count of denominations available' })
  @ApiResponse({ status: 200, description: 'The denominations count.' })
  async getCount() {
    return this.moneyChangerService.getCount();
  }

  @Post('transaction')
  @ApiOperation({ summary: 'Get transactions for a given mobile number and date range' })
  @ApiResponse({ status: 200, description: 'The transactions for the given mobile number and date range.' })
  async getTransactions(@Body() transactionRequestDto: TransactionRequestDto) {
    return this.moneyChangerService.getTransactions(transactionRequestDto);
  }

  /**
   * TODO: Uncomment this method when you have implemented the functionality to add new denominations.
   * This method will add a new denomination to the system.
   *
   * @param createDenominationDto - The denomination details to be added.
   * @returns {Promise<Object>} - Returns the added denomination.
   *
   * @api {post} /money-changer/add-denomination Add a new denomination
   * @apiGroup Money Changer
   * @apiParam {Number} denomination The denomination value.
   * @apiParam {Number} count The count of the denomination.
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 201 Created
   *   {
   *     "denomination": 10,
   *     "count": 50
   *   }
   * @apiErrorExample {json} Error-Response:
   *
  **/
  // @Post('add-denomination')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async addDenomination(
  //   @Body() createDenominationDto: CreateDenominationDto,
  // ): Promise<Object> {
  //   return this.moneyChangerService.addDenomination(createDenominationDto);
  // }
}
