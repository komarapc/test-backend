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
import { VehicleModelService } from './vehicle-model.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiCommonResponses } from '@/utils/openapi-response-decorators';
import { VehicleModelDto, VehicleModelQuery } from './vehicle-model.dto';
import { Response } from 'express';

@ApiTags('vehicle-model')
@ApiBearerAuth()
@ApiCommonResponses()
@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @Get()
  async findAll(@Query() query: VehicleModelQuery, @Res() res: Response) {
    const result = await this.vehicleModelService.findAll(query);
    res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleModelService.findById(id);
    res.status(result.statusCode).send(result);
  }

  @Post()
  async create(@Body() body: VehicleModelDto, @Res() res: Response) {
    const result = await this.vehicleModelService.store(body);
    res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: VehicleModelDto,
    @Res() res: Response,
  ) {
    const result = await this.vehicleModelService.update(id, body);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleModelService.delete(id);
    res.status(result.statusCode).send(result);
  }
}
