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
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserCreateDto, UserQuery, UserUpdateDto } from './users.dto';
import { ApiCommonResponses } from '@/utils/openapi-response-decorators';

@ApiTags('users')
@ApiCommonResponses()
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response, @Query() query: UserQuery) {
    const result = await this.usersService.findAll(query);
    return res.status(result.statusCode).send(result);
  }
  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.findById(id);
    res.status(result.statusCode).send(result);
  }

  @Post()
  async store(@Body() userDto: UserCreateDto, @Res() res: Response) {
    const result = await this.usersService.store(userDto);
    res.status(result.statusCode).send(result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserUpdateDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.update(id, userDto);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.usersService.delete(id);
    res.status(result.statusCode).send(result);
  }
}
