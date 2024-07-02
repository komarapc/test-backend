import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { VehicleModelDto, VehicleModelQuery } from './vehicle-model.dto';
import { getOffset, getTotalPage } from '@/utils';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class VehicleModelRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: VehicleModelQuery) {
    const offset = getOffset(query.page, query.limit);
    const where = {
      name: {
        contains: query.name,
      },
      vehicle_type: {
        name: { contains: query.type_name },
      },
    };
    const [vehicleModel, total] = await Promise.all([
      this.prisma.vehicleModel.findMany({
        where,
        include: {
          vehicle_type: true,
        },
        skip: offset,
        take: query.limit,
      }),
      this.prisma.vehicleModel.count({ where }),
    ]);
    const metadata: MetaData = {
      page: query.page,
      limit: query.limit,
      total,
      totalPage: getTotalPage(total, query.limit),
    };
    return { vehicleModel, metadata };
  }

  async findById(id: string) {
    return await this.prisma.vehicleModel.findUnique({
      where: { id },
      include: { vehicle_type: true },
    });
  }

  async store(data: VehicleModelDto) {
    return await this.prisma.vehicleModel.create({
      data: { id: nanoid(), ...data },
    });
  }

  async update(id: string, data: VehicleModelDto) {
    return await this.prisma.vehicleModel.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await this.prisma.vehicleModel.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
