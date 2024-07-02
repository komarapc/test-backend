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
import { VehicleBrandService } from './vehicle-brand.service';
import { VehicleBrandCreateDto, VehicleBrandQuery } from './vehicle-brand.dto';
import { Response } from 'express';
@ApiTags('vehicle-brand')
@ApiBearerAuth()
@ApiCommonResponses()
@Controller('vehicle-brand')
export class VehicleBrandController {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}

  @Get()
  async findAll(@Query() query: VehicleBrandQuery, @Res() res: Response) {
    const result = await this.vehicleBrandService.findAll(query);
    res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleBrandService.findById(id);
    res.status(result.statusCode).send(result);
  }

  @Post()
  async store(@Res() res: Response, @Body() body: VehicleBrandCreateDto) {
    const result = await this.vehicleBrandService.store(body);
    res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: VehicleBrandCreateDto,
    @Res() res: Response,
  ) {
    const result = await this.vehicleBrandService.update(id, body);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleBrandService.delete(id);
    res.status(result.statusCode).send(result);
  }
}
