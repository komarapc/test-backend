import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(BearerMiddleware.name);
  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(BearerMiddleware.name);
    next();
  }
}
