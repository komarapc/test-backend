import { excludeFields } from './../../utils/index';
import { Injectable } from '@nestjs/common';
import { UsersRepo } from '../users/users.repo';
import { AuthDto } from './auth.dto';
import { debugConsole, response200, response401, response500 } from '@/utils';
import { ResponseJson } from '@/utils/response-json';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UsersRepo) {}
  async login(data: AuthDto): Promise<ResponseJson> {
    try {
      const user = await this.userRepo.findByEmail(data.email);
      let message = 'We cannot find an account with that email address.';
      if (!user) return response401(message);
      const isPasswordMatch = compareSync(data.password, user.password);
      if (!isPasswordMatch) return response401('Invalid password');
      const payload = {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      const userWithoutPasswordField = excludeFields(user, [
        'password',
        'deleted_at',
      ]);
      return response200({
        data: {
          user: userWithoutPasswordField,
          token,
        },
      });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
