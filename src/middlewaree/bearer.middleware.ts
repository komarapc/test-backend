import {
  ForbiddenException,
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class BearerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(BearerMiddleware.name);
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthorizedException();
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);
      if (!Object.keys(payload).length) throw new UnauthorizedException();
      if (!payload.is_admin && req.method !== 'GET')
        throw new ForbiddenException();
    } catch (error) {
      this.logger.error(error);
      res.status(error.status).send(error.response);
      return;
    }
    next();
  }
}
