import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class PriceListDto {
  @ApiProperty({
    name: 'code',
    type: String,
    description: 'The code of the price list',
    example: `PL-${new Date().getFullYear()}-001`,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    description: 'The price of the price list',
    example: 1000000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({
    name: 'year_id',
    type: String,
    description: 'id of vehicle year',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  year_id: string;

  @ApiProperty({
    name: 'model_id',
    type: String,
    description: 'id of vehicle model',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  model_id: string;
}

export class PriceListUpdateDto {
  @ApiProperty({
    name: 'code',
    type: String,
    description: 'The code of the price list',
    example: `PL-${new Date().getFullYear()}-001`,
    required: false,
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    description: 'The price of the price list',
    example: 1000000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({
    name: 'year_id',
    type: String,
    description: 'id of vehicle year',
    required: false,
  })
  @IsString()
  @IsOptional()
  year_id: string;

  @ApiProperty({
    name: 'model_id',
    type: String,
    description: 'id of vehicle model',
    required: false,
  })
  @IsString()
  @IsOptional()
  model_id: string;
}

export class PriceListQuery {
  @ApiProperty({
    name: 'code',
    type: String,
    description: 'The code of the price list',
    example: 'PL-2021-001',
    required: false,
  })
  code: string;

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
    name: 'start_year',
    type: Number,
    description: 'The start year of the vehicle',
    example: new Date().getFullYear() - 3,
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  start_year: number;

  @ApiProperty({
    name: 'end_year',
    type: Number,
    description: 'The end year of the vehicle',
    example: new Date().getFullYear(),
    required: false,
  })
  @Transform(({ value }) => parseInt(value))
  end_year: number;

  @ApiProperty({
    name: 'start_price_range',
    type: Number,
    description: 'The start price range of the vehicle',
    example: 1000000,
    required: false,
  })
  @Transform(({ value }) => parseFloat(value))
  start_price_range: number;

  @ApiProperty({
    name: 'end_price_range',
    type: Number,
    description: 'The end price range of the vehicle',
    example: 10000000,
    required: false,
  })
  @Transform(({ value }) => parseFloat(value))
  end_price_range: number;

  @ApiProperty({
    name: 'model_name',
    type: String,
    description: 'The name of the model',
    example: 'Toyota',
    required: false,
  })
  model_name: string;

  @ApiProperty({
    name: 'page',
    type: Number,
    description: 'The page number',
    example: 1,
    required: true,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    name: 'limit',
    type: Number,
    description: 'The number of items per page',
    example: 10,
    required: true,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
