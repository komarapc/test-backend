import { Injectable } from '@nestjs/common';
import { VehicleYearRepo } from './vehicle-year.repo';
import { VehicleYearDto, VehicleYearQuery } from './vehicle-year.dto';
import {
  debugConsole,
  response200,
  response201,
  response404,
  response409,
  response500,
} from '@/utils';
import { ResponseJson } from '@/utils/response-json';

@Injectable()
export class VehicleYearService {
  constructor(private readonly vehicleYearRepo: VehicleYearRepo) {}
  async findAll(query: VehicleYearQuery): Promise<ResponseJson> {
    try {
      const result = await this.vehicleYearRepo.findAll(query);
      if (!Object.keys(result.vehicleYear).length)
        return response404('Data not found');
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async findById(id: string): Promise<ResponseJson> {
    try {
      const result = await this.vehicleYearRepo.findById(id);
      if (!result || result.deleted_at) return response404('Data not found');
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async store(data: VehicleYearDto): Promise<ResponseJson> {
    try {
      const existsYear = await this.vehicleYearRepo.findByYear(data.year);
      if (existsYear) return response409();
      const result = await this.vehicleYearRepo.store(data);
      return response201({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async update(id: string, data: VehicleYearDto): Promise<ResponseJson> {
    try {
      const [existVehicleYear, existDataYear] = await Promise.all([
        this.vehicleYearRepo.findById(id),
        this.vehicleYearRepo.findByYear(data.year),
      ]);
      if (!existVehicleYear || existVehicleYear.deleted_at)
        return response404();
      if (existDataYear && existDataYear.id !== id) return response409();
      const result = await this.vehicleYearRepo.update(id, data);
      return response200({ data: result, message: 'Updated' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async delete(id: string): Promise<ResponseJson> {
    try {
      const existData = await this.vehicleYearRepo.findById(id);
      if (!existData || existData.deleted_at) return response404();
      await this.vehicleYearRepo.delete(id);
      return response200({ message: 'Deleted' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
