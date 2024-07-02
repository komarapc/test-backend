import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class VehicleBrandQuery {
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Name of the vehicle brand',
    type: String,
  })
  name: string;

  @ApiProperty({
    required: false,
    name: 'page',
    description: 'Page number',
    type: Number,
    default: 1,
    example: 1,
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    required: false,
    name: 'limit',
    description: 'Limit of data per page',
    type: Number,
    default: 10,
    example: 10,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}

export class VehicleBrandCreateDto {
  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Name of the vehicle brand',
    type: String,
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
