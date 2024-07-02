import { Module } from '@nestjs/common';
import { VehicleModelController } from './vehicle-model.controller';
import { VehicleModelService } from './vehicle-model.service';
import { PrismaService } from '@/services/prisma.service';
import { VehicleModelRepo } from './vehicle-model.repo';
import { VehicleTypeRepo } from '../vehicle-type/vehicle-type.repo';

@Module({
  controllers: [VehicleModelController],
  providers: [
    VehicleModelService,
    PrismaService,
    VehicleModelRepo,
    VehicleTypeRepo,
  ],
})
export class VehicleModelModule {}
