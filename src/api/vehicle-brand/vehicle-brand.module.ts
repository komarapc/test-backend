import { Module } from '@nestjs/common';
import { VehicleBrandController } from './vehicle-brand.controller';
import { VehicleBrandService } from './vehicle-brand.service';
import { PrismaService } from '@/services/prisma.service';
import { VehicleBrandRepo } from './vehicle-brand.repo';

@Module({
  controllers: [VehicleBrandController],
  providers: [VehicleBrandService, PrismaService, VehicleBrandRepo],
})
export class VehicleBrandModule {}
