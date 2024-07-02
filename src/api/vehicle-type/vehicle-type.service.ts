import { Injectable } from '@nestjs/common';
import { VehicleTypeRepo } from './vehicle-type.repo';
import { VehicleTypeCreateDto, VehicleTypeQuery } from './vehicle-type.dto';
import { debugConsole } from '@/utils';
import {
  response200,
  response201,
  response404,
  response409,
  response500,
} from '@/utils';
import { ResponseJson } from '@/utils/response-json';
import { VehicleBrandRepo } from '../vehicle-brand/vehicle-brand.repo';
@Injectable()
export class VehicleTypeService {
  constructor(
    private readonly vehicleTypeRepo: VehicleTypeRepo,
    private readonly vehicleBrandRepo: VehicleBrandRepo,
  ) {}

  async findAll(query: VehicleTypeQuery) {
    try {
      const vehicleType = await this.vehicleTypeRepo.findAll(query);
      if (!Object.keys(vehicleType.vehicleType).length) return response404();
      return response200({ data: vehicleType });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async findById(id: string): Promise<ResponseJson> {
    try {
      const existVehicleType = await this.vehicleTypeRepo.findById(id);
      if (!existVehicleType || existVehicleType.deleted_at)
        return response404();
      return response200({ data: existVehicleType });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async store(data: VehicleTypeCreateDto): Promise<ResponseJson> {
    try {
      const existVehicleBrand = await this.vehicleBrandRepo.findById(
        data.brand_id,
      );
      if (!existVehicleBrand || existVehicleBrand.deleted_at)
        return response404('Brand not found');
      const store = await this.vehicleTypeRepo.store(data);
      return response201({ data: store });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async update(id: string, data: VehicleTypeCreateDto): Promise<ResponseJson> {
    try {
      const [existVenicleType, existVenicleBrand] = await Promise.all([
        this.vehicleTypeRepo.findById(id),
        this.vehicleBrandRepo.findById(data.brand_id),
      ]);
      if (!existVenicleType || existVenicleType.deleted_at)
        return response404();
      if (!existVenicleBrand || existVenicleBrand.deleted_at)
        return response404('Brand not found');

      const update = await this.vehicleTypeRepo.update(id, data);
      return response200({ data: update });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async delete(id: string): Promise<ResponseJson> {
    try {
      const existVehicleType = await this.vehicleTypeRepo.findById(id);
      if (!existVehicleType || existVehicleType.deleted_at)
        return response404();
      await this.vehicleTypeRepo.delete(id);
      return response200({ message: 'Deleted' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
