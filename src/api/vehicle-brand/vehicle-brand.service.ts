import {
  response404,
  response200,
  response201,
  response409,
} from '@/utils/index';
import { HttpStatus, Injectable } from '@nestjs/common';
import { VehicleBrandRepo } from './vehicle-brand.repo';
import { VehicleBrandCreateDto, VehicleBrandQuery } from './vehicle-brand.dto';
import { debugConsole, response500 } from '@/utils';
import { ResponseJson } from '@/utils/response-json';

@Injectable()
export class VehicleBrandService {
  constructor(private readonly vehicleBrandRepo: VehicleBrandRepo) {}
  async findAll(query: VehicleBrandQuery): Promise<ResponseJson> {
    try {
      const result = await this.vehicleBrandRepo.findAll(query);
      if (!Object.keys(result.vehicleBrand).length) return response404();
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async findById(id: string): Promise<ResponseJson> {
    try {
      const vehicleBrand = await this.vehicleBrandRepo.findById(id);
      if (!vehicleBrand || vehicleBrand.deleted_at) return response404();
      return response200({ data: vehicleBrand });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async store(data: VehicleBrandCreateDto) {
    try {
      const existBrandnName = await this.vehicleBrandRepo.findSingleByName(
        data.name,
      );
      if (existBrandnName) return response409();
      const result = await this.vehicleBrandRepo.store(data);
      return response201(result);
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async update(id: string, data: VehicleBrandCreateDto) {
    try {
      const [existVehicleBrand, existBrandnName] = await Promise.all([
        this.vehicleBrandRepo.findById(id),
        this.vehicleBrandRepo.findSingleByName(data.name),
      ]);
      if (!existVehicleBrand || existVehicleBrand.deleted_at)
        return response404();
      if (existBrandnName && existBrandnName.id !== id) return response409();
      const result = await this.vehicleBrandRepo.update(id, data);
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async delete(id: string) {
    try {
      const existVehicleBrand = await this.vehicleBrandRepo.findById(id);
      if (!existVehicleBrand || existVehicleBrand.deleted_at)
        return response404();
      await this.vehicleBrandRepo.delete(id);
      return response200({});
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
