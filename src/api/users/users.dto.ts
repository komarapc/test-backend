import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserQuery {
  @ApiProperty({
    required: false,
    description: 'User name',
    example: 'admin',
    name: 'name',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'User email',
    name: 'email',
    example: 'admin@mail.com',
  })
  email: string;

  @ApiProperty({
    required: false,
    name: 'is_admin',
    description: 'Is admin',
    example: true,
  })
  @Transform(({ value }) => value === 'true' || value === true)
  is_admin: boolean;

  @ApiProperty({
    required: false,
    name: 'start_created_at',
    description: 'Start created at',
    example: new Date().toISOString(),
  })
  start_created_at: Date;

  @ApiProperty({
    required: false,
    name: 'end_created_at',
    description: 'End created at',
    example: new Date().toISOString(),
  })
  end_created_at: Date;

  @ApiProperty({
    required: true,
    name: 'page',
    description: 'Page',
    example: 1,
    default: 1,
  })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({
    required: true,
    name: 'limit',
    description: 'Limit',
    example: 10,
    default: 10,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}

export class UserCreateDto {
  @ApiProperty({
    required: true,
    description: 'User name',
    example: 'john doe',
    name: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    description: 'User email',
    example: 'johndoe@mail.com',
    name: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'User password',
    example: 'password',
    name: 'password',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    required: false,
    description: 'Is admin',
    example: false,
    name: 'is_admin',
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  is_admin: boolean;
}

export class UserUpdateDto {
  @ApiProperty({
    required: false,
    description: 'User name',
    example: 'john doe',
    name: 'name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
    description: 'User email',
    example: 'johndoe@mail.com',
    name: 'email',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    required: false,
    description: 'User password',
    example: 'password',
    name: 'password',
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;

  @ApiProperty({
    required: false,
    description: 'Is admin',
    example: false,
    name: 'is_admin',
  })
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsOptional()
  is_admin: boolean;
}

export const userWithoutPasswordField = {
  id: true,
  name: true,
  email: true,
  is_admin: true,
  created_at: true,
  updated_at: true,
};
