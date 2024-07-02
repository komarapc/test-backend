import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  UserCreateDto,
  UserQuery,
  userWithoutPasswordField,
} from './users.dto';
import { dateToEpoch } from '@/utils';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query?: UserQuery) {
    const offset = query.page * query.limit - query.limit;
    const where = {
      deleted_at: null,
      email: {
        contains: query.email,
      },
      name: { contains: query.name },
      is_admin: query.is_admin,
      created_at: {
        gte: query.start_created_at
          ? new Date(query?.start_created_at).toISOString()
          : undefined,
        lte: query.end_created_at
          ? new Date(query?.end_created_at).toISOString()
          : undefined,
      },
    };
    const [users, total] = await Promise.all([
      this.prisma.users.findMany({
        where,
        select: { ...userWithoutPasswordField },
        skip: offset,
        take: query.limit,
      }),
      this.prisma.users.count({ where }),
    ]);
    const metadata: MetaData = {
      total,
      page: query.page,
      totalPage: Math.ceil(total / query.limit),
      limit: query.limit,
    };
    return { users, metadata };
  }

  async findById(id: string) {
    return await this.prisma.users.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await this.prisma.users.findUnique({ where: { email } });
  }

  async store(data: UserCreateDto) {
    return await this.prisma.users.create({
      data: {
        id: nanoid(),
        ...data,
      },
    });
  }

  async update(id: string, data: UserCreateDto) {
    return await this.prisma.users.update({
      where: { id },
      data,
      select: { ...userWithoutPasswordField },
    });
  }

  async delete(id: string) {
    return await this.prisma.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
