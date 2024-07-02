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
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeCreateDto, VehicleTypeQuery } from './vehicle-type.dto';
import { Response } from 'express';

@ApiTags('vehicle-type')
@ApiCommonResponses()
@ApiBearerAuth()
@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @Get()
  async findAyll(@Query() query: VehicleTypeQuery, @Res() res: Response) {
    const result = await this.vehicleTypeService.findAll(query);
    res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleTypeService.findById(id);
    res.status(result.statusCode).send(result);
  }

  @Post()
  async store(@Body() body: VehicleTypeCreateDto, @Res() res: Response) {
    const result = await this.vehicleTypeService.store(body);
    res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: VehicleTypeCreateDto,
    @Res() res: Response,
  ) {
    const result = await this.vehicleTypeService.update(id, body);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleTypeService.delete(id);
    res.status(result.statusCode).send(result);
  }
}
