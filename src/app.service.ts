import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello() {
    return { statusCode: HttpStatus.OK, message: 'Test API is working!' };
  }
}
