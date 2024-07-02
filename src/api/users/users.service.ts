import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { UserCreateDto, UserQuery, UserUpdateDto } from './users.dto';
import { ResponseJson } from '@/utils/response-json';
import { debugConsole, response500 } from '@/utils';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepo) {}

  async findAll(query?: UserQuery): Promise<ResponseJson> {
    try {
      const result = await this.usersRepo.findAll(query);
      return {
        statusCode: HttpStatus.OK,
        statusMessage: 'OK',
        data: result,
      };
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async findById(id: string): Promise<ResponseJson> {
    try {
      const result = await this.usersRepo.findById(id);
      if (!result)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          statusMessage: 'NOT FOUND',
          message: 'User not found',
        };
      return {
        statusCode: HttpStatus.OK,
        statusMessage: 'OK',
        data: result,
      };
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async store(data: UserCreateDto): Promise<ResponseJson> {
    try {
      const findEmail = await this.usersRepo.findByEmail(data.email);
      if (findEmail)
        return {
          statusCode: HttpStatus.CONFLICT,
          statusMessage: 'CONFLICT',
          message: 'Email already exists',
        };
      const hashPassword = bcrypt.hashSync(data.password, 10);
      data.password = hashPassword;
      const result = await this.usersRepo.store(data);
      return {
        statusCode: HttpStatus.CREATED,
        statusMessage: 'CREATED',
        message: 'User created',
        data: result,
      };
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async update(id: string, data: UserUpdateDto): Promise<ResponseJson> {
    try {
      const [userExist, emailExist] = await Promise.all([
        this.usersRepo.findById(id),
        this.usersRepo.findByEmail(data.email),
      ]);
      if (!userExist)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          statusMessage: 'NOT FOUND',
          message: 'User not found',
        };
      if (emailExist && emailExist.id !== id)
        return {
          statusCode: HttpStatus.CONFLICT,
          statusMessage: 'CONFLICT',
          message: 'Email has been used',
        };
      if (data.password) {
        const hashPassword = bcrypt.hashSync(data.password, 10);
        data.password = hashPassword;
      }
      const result = await this.usersRepo.update(id, data);
      return {
        statusCode: HttpStatus.OK,
        statusMessage: 'OK',
        message: 'User updated',
        data: result,
      };
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async delete(id: string): Promise<ResponseJson> {
    try {
      const userExist = await this.usersRepo.findById(id);
      if (!userExist || userExist.deleted_at)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          statusMessage: 'NOT FOUND',
          message: 'User not found',
        };
      const result = await this.usersRepo.delete(id);
      return {
        statusCode: HttpStatus.OK,
        statusMessage: 'OK',
        message: 'User deleted',
      };
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
