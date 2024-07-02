import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@/services/prisma.service';
import { UsersRepo } from '../users/users.repo';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersRepo],
})
export class AuthModule {}
