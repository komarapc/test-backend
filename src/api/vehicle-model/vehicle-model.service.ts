import { Injectable } from '@nestjs/common';
import { VehicleModelRepo } from './vehicle-model.repo';
import { VehicleModelDto, VehicleModelQuery } from './vehicle-model.dto';
import {
  debugConsole,
  response200,
  response201,
  response404,
  response500,
} from '@/utils';
import { ResponseJson } from '@/utils/response-json';
import { VehicleTypeRepo } from '../vehicle-type/vehicle-type.repo';

@Injectable()
export class VehicleModelService {
  constructor(
    private readonly vehicleModelRepo: VehicleModelRepo,
    private readonly vehicleTypeRepo: VehicleTypeRepo,
  ) {}
  async findAll(query: VehicleModelQuery): Promise<ResponseJson> {
    try {
      const result = await this.vehicleModelRepo.findAll(query);
      if (!Object.keys(result.vehicleModel).length) return response404();
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }

  async findById(id: string): Promise<ResponseJson> {
    try {
      const result = await this.vehicleModelRepo.findById(id);
      if (!result || result.deleted_at) return response404();
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async store(data: VehicleModelDto): Promise<ResponseJson> {
    try {
      const existTypeVehicle = await this.vehicleTypeRepo.findById(
        data.type_id,
      );
      if (!existTypeVehicle || existTypeVehicle.deleted_at)
        return response404('Vehicle Type not found');
      const result = await this.vehicleModelRepo.store(data);
      return response201({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async update(id: string, data: VehicleModelDto): Promise<ResponseJson> {
    try {
      const [existVehicleModel, existVehicelType] = await Promise.all([
        this.vehicleModelRepo.findById(id),
        this.vehicleTypeRepo.findById(data.type_id),
      ]);
      if (!existVehicleModel || existVehicleModel.deleted_at)
        return response404();
      if (!existVehicelType || existVehicelType.deleted_at)
        return response404();

      const result = await this.vehicleModelRepo.update(id, data);
      return response200({ data: result, message: 'Updated' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async delete(id: string): Promise<ResponseJson> {
    try {
      const existVehicleModel = await this.vehicleModelRepo.findById(id);
      if (!existVehicleModel || existVehicleModel.deleted_at)
        return response404();
      await this.vehicleModelRepo.delete(id);
      return response200({ message: 'Deleted' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
