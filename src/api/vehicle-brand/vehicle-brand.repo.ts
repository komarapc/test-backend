import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { VehicleBrandCreateDto, VehicleBrandQuery } from './vehicle-brand.dto';
import { contains } from 'class-validator';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class VehicleBrandRepo {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: VehicleBrandQuery) {
    const offset = query.page * query.limit - query.limit;
    const where = {
      deleted_at: null,
      name: { contains: query.name },
    };
    const [vehicleBrand, total] = await Promise.all([
      this.prisma.vehicleBrand.findMany({
        where,
        skip: offset,
        take: query.limit,
      }),
      this.prisma.vehicleBrand.count({ where }),
    ]);
    const metadata: MetaData = {
      page: query.page,
      limit: query.limit,
      total,
      totalPage: Math.ceil(total / query.limit),
    };
    return { vehicleBrand, metadata };
  }
  async findById(id: string) {
    return this.prisma.vehicleBrand.findUnique({ where: { id } });
  }

  async findSingleByName(name: string) {
    return await this.prisma.vehicleBrand.findFirst({
      where: { deleted_at: null, name },
    });
  }
  async store(data: VehicleBrandCreateDto) {
    return await this.prisma.vehicleBrand.create({
      data: {
        id: nanoid(),
        ...data,
      },
    });
  }
  async update(id: string, data: VehicleBrandCreateDto) {
    return await this.prisma.vehicleBrand.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.prisma.vehicleBrand.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
