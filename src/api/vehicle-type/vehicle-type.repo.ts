import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { VehicleTypeCreateDto, VehicleTypeQuery } from './vehicle-type.dto';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class VehicleTypeRepo {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: VehicleTypeQuery) {
    const offset = query.page * query.limit - query.limit;
    const where = {
      deleted_at: null,
      name: { contains: query.name },
      vehicle_brand: { name: { contains: query.brand_name } },
    };
    const [vehicleType, total] = await Promise.all([
      this.prisma.vehicleType.findMany({
        where,
        skip: offset,
        take: query.limit,
        include: { vehicle_brand: true },
      }),
      this.prisma.vehicleType.count({ where }),
    ]);
    const metadata: MetaData = {
      page: query.page,
      limit: query.limit,
      total,
      totalPage: Math.ceil(total / query.limit),
    };
    return { vehicleType, metadata };
  }

  async findById(id: string) {
    return this.prisma.vehicleType.findUnique({
      where: { id },
      include: { vehicle_brand: true },
    });
  }
  async store(data: VehicleTypeCreateDto) {
    return await this.prisma.vehicleType.create({
      data: {
        id: nanoid(),
        ...data,
      },
      include: { vehicle_brand: true },
    });
  }

  async update(id: string, data: VehicleTypeCreateDto) {
    return await this.prisma.vehicleType.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    return await this.prisma.vehicleType.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
