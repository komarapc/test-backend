import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VehicleModelDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of the vehicle model',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'type_id',
    description: 'ID of the vehicle type',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type_id: string;
}

export class VehicleModelQuery {
  @ApiProperty({
    name: 'name',
    description: 'Name of the vehicle model',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    name: 'vehicle_type_name',
    description: 'Name of the vehicle type',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  type_name: string;

  @ApiProperty({
    name: 'page',
    description: 'Page number',
    type: Number,
    required: true,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'Number of items per page',
    type: Number,
    required: true,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
