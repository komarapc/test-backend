import { ApiCommonResponses } from '@/utils/openapi-response-decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PriceListsService } from './price-lists.service';
import {
  PriceListDto,
  PriceListQuery,
  PriceListUpdateDto,
} from './price-lists.dto';
import { Response } from 'express';

@ApiTags('price-lists')
@ApiBearerAuth()
@ApiCommonResponses()
@Controller('price-lists')
export class PriceListsController {
  constructor(private readonly service: PriceListsService) {}

  @Get()
  async findAll(@Query() query: PriceListQuery, @Res() res: Response) {
    const result = await this.service.findAll(query);
    return res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.findById(id);
    return res.status(result.statusCode).send(result);
  }

  @Post()
  async store(@Body() data: PriceListDto, @Res() res: Response) {
    const result = await this.service.store(data);
    return res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: PriceListUpdateDto,
    @Res() res: Response,
  ) {
    const result = await this.service.update(id, data);
    return res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.delete(id);
    return res.status(result.statusCode).send(result);
  }
}
