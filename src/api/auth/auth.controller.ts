import { ApiCommonResponses } from '@/utils/openapi-response-decorators';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Response } from 'express';
@ApiTags('auth')
@ApiCommonResponses()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const result = await this.authService.login(body);
    res.status(result.statusCode).send(result);
  }
}
