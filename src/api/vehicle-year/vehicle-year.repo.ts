import { PrismaService } from '@/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { VehicleYearDto, VehicleYearQuery } from './vehicle-year.dto';
import { getOffset, getTotalPage } from '@/utils';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class VehicleYearRepo {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: VehicleYearQuery) {
    const offset = getOffset(query.page, query.limit);
    const where = {
      year: query.year,
    };
    const [vehicleYear, total] = await Promise.all([
      this.prisma.vehicleYear.findMany({
        where,
        skip: offset,
        take: query.limit,
      }),
      this.prisma.vehicleYear.count({ where }),
    ]);
    const metadata: MetaData = {
      page: query.page,
      limit: query.limit,
      total,
      totalPage: getTotalPage(total, query.limit),
    };
    return { vehicleYear, metadata };
  }
  async findById(id: string) {
    return await this.prisma.vehicleYear.findUnique({ where: { id } });
  }
  async findByYear(year: number) {
    return await this.prisma.vehicleYear.findFirst({ where: { year } });
  }
  async store(data: VehicleYearDto) {
    return await this.prisma.vehicleYear.create({
      data: {
        id: nanoid(),
        ...data,
      },
    });
  }
  async update(id: string, data: VehicleYearDto) {
    return await this.prisma.vehicleYear.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.prisma.vehicleYear.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
