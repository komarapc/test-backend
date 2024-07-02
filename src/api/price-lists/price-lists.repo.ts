import { PrismaService } from '@/services/prisma.service';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { PriceListDto, PriceListQuery } from './price-lists.dto';
import { getOffset, getTotalPage } from '@/utils';
import { MetaData } from '@/utils/interfaces';
import { nanoid } from 'nanoid';

@Injectable()
export class PriceListsRepo {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(query: PriceListQuery) {
    const offset = getOffset(query?.page, query?.limit);
    const where = {
      code: { contains: query.code },
      vehicle_model: {
        name: { contains: query?.model_name },
      },
      vehicle_year: {
        year: query?.year,
        AND: [
          { year: { gte: query?.start_year } },
          { year: { lte: query?.end_year } },
        ],
      },
      price: {
        gte: query?.start_price_range,
        lte: query?.end_price_range,
      },
    };
    const [priceLists, total] = await Promise.all([
      this.prisma.priceList.findMany({
        where,
        take: query?.limit,
        skip: offset,
        include: {
          vehicle_model: true,
          vehicle_year: true,
        },
      }),
      this.prisma.priceList.count({ where }),
    ]);
    const metadata: MetaData = {
      page: query?.page,
      limit: query?.limit,
      total,
      totalPage: getTotalPage(total, query?.limit),
    };
    return { priceLists, metadata };
  }
  async findById(id?: string) {
    return await this.prisma.priceList.findUnique({
      where: { id },
      include: {
        vehicle_model: true,
        vehicle_year: true,
      },
    });
  }
  async findByCode(code: string) {
    return await this.prisma.priceList.findFirst({ where: { code } });
  }
  async store(data: PriceListDto) {
    return await this.prisma.priceList.create({
      data: {
        id: nanoid(),
        ...data,
      },
      include: {
        vehicle_model: true,
        vehicle_year: true,
      },
    });
  }
  async update(id: string, data: PriceListDto) {
    return await this.prisma.priceList.update({ where: { id }, data });
  }
  async delete(id: string) {
    return await this.prisma.priceList.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
