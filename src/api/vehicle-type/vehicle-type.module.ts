import { Module } from '@nestjs/common';
import { VehicleTypeController } from './vehicle-type.controller';
import { VehicleTypeService } from './vehicle-type.service';
import { PrismaService } from '@/services/prisma.service';
import { VehicleTypeRepo } from './vehicle-type.repo';
import { VehicleBrandRepo } from '../vehicle-brand/vehicle-brand.repo';

@Module({
  controllers: [VehicleTypeController],
  providers: [
    VehicleTypeService,
    PrismaService,
    VehicleTypeRepo,
    VehicleBrandRepo,
  ],
})
export class VehicleTypeModule {}
