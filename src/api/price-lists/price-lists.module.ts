import { Module } from '@nestjs/common';
import { PriceListsController } from './price-lists.controller';
import { PriceListsService } from './price-lists.service';
import { PrismaService } from '@/services/prisma.service';
import { PriceListsRepo } from './price-lists.repo';
import { VehicleModelRepo } from '../vehicle-model/vehicle-model.repo';
import { VehicleYearRepo } from '../vehicle-year/vehicle-year.repo';

@Module({
  controllers: [PriceListsController],
  providers: [
    PriceListsService,
    PrismaService,
    PriceListsRepo,
    VehicleModelRepo,
    VehicleYearRepo,
  ],
})
export class PriceListsModule {}
