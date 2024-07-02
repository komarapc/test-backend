import { Module } from '@nestjs/common';
import { VehicleYearController } from './vehicle-year.controller';
import { VehicleYearService } from './vehicle-year.service';
import { PrismaService } from '@/services/prisma.service';
import { VehicleYearRepo } from './vehicle-year.repo';

@Module({
  controllers: [VehicleYearController],
  providers: [VehicleYearService, PrismaService, VehicleYearRepo],
})
export class VehicleYearModule {}
