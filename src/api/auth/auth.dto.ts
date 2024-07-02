import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    name: 'email',
    type: String,
    example: 'admin@mail.com',
    description: 'Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: 'password',
    description: 'Password',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
