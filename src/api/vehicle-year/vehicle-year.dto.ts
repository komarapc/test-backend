import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VehicleYearDto {
  @ApiProperty({
    name: 'year',
    type: Number,
    description: 'The year of the vehicle',
    example: new Date().getFullYear(),
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  year: number;
}

export class VehicleYearQuery {
  @ApiProperty({
    name: 'year',
    type: Number,
    description: 'The year of the vehicle',
    example: new Date().getFullYear(),
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  year: number;

  @ApiProperty({
    name: 'page',
    type: Number,
    description: 'The page number',
    example: 1,
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    name: 'limit',
    type: Number,
    description: 'The number of items per page',
    example: 10,
    required: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
