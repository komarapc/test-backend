import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VehicleTypeCreateDto {
  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Name of the vehicle type',
    type: String,
    example: 'Sedan',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    name: 'brand_id',
    description: 'Brand ID of the vehicle type',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  brand_id: string;
}
export class VehicleTypeUpdateDto {
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Name of the vehicle type',
    type: String,
    example: 'Sedan',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    name: 'brand_id',
    description: 'Brand ID of the vehicle type',
    type: String,
  })
  @IsString()
  @IsOptional()
  brand_id: string;
}

export class VehicleTypeQuery {
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Name of the vehicle type',
    type: String,
  })
  name: string;

  @ApiProperty({
    required: false,
    name: 'brand_name',
    description: 'Name of the vehicle brand',
    type: String,
  })
  brand_name: string;

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
