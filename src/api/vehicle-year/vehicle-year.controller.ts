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
import { VehicleYearService } from './vehicle-year.service';
import { VehicleYearDto, VehicleYearQuery } from './vehicle-year.dto';
import { Response } from 'express';

@ApiTags('vehicle-year')
@ApiBearerAuth()
@ApiCommonResponses()
@Controller('vehicle-year')
export class VehicleYearController {
  constructor(private readonly vehicleYearService: VehicleYearService) {}

  @Get()
  async findAll(@Query() query: VehicleYearQuery, @Res() res: Response) {
    const result = await this.vehicleYearService.findAll(query);
    res.status(result.statusCode).send(result);
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param('id') id: string) {
    const result = await this.vehicleYearService.findById(id);
    res.status(result.statusCode).send(result);
  }

  @Post()
  async store(@Body() body: VehicleYearDto, @Res() res: Response) {
    const result = await this.vehicleYearService.store(body);
    res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: VehicleYearDto,
    @Res() res: Response,
  ) {
    const result = await this.vehicleYearService.update(id, body);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.vehicleYearService.delete(id);
    res.status(result.statusCode).send(result);
  }
}
