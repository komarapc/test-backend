import { HttpStatus, Injectable } from '@nestjs/common';
import { PriceListsRepo } from './price-lists.repo';
import { VehicleModelRepo } from '../vehicle-model/vehicle-model.repo';
import { ResponseJson } from '@/utils/response-json';
import { debugConsole, response200, response404, response500 } from '@/utils';
import { PriceListDto, PriceListQuery } from './price-lists.dto';
import { VehicleYearRepo } from '../vehicle-year/vehicle-year.repo';

@Injectable()
export class PriceListsService {
  constructor(
    private readonly priceListRepo: PriceListsRepo,
    private readonly vehicleModelRepo: VehicleModelRepo,
    private readonly vehicleYearRepo: VehicleYearRepo,
  ) {}

  async findAll(query: PriceListQuery): Promise<ResponseJson> {
    try {
      const result = await this.priceListRepo.findAll(query);
      if (!Object.keys(result.priceLists).length)
        return response404('Data not found');

      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async findById(id: string): Promise<ResponseJson> {
    try {
      const result = await this.priceListRepo.findById(id);
      if (!result || result.deleted_at) return response404();
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async store(data: PriceListDto): Promise<ResponseJson> {
    try {
      const [vehicleModel, vehicleType] = await Promise.all([
        this.vehicleModelRepo.findById(data.model_id),
        this.vehicleYearRepo.findById(data.year_id),
      ]);
      if (
        !vehicleModel ||
        vehicleModel.deleted_at ||
        !vehicleType ||
        vehicleType.deleted_at
      )
        return response404('Vehicle not found');
      const result = await this.priceListRepo.store(data);
      return response200({ data: result });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async update(id: string, data: PriceListDto): Promise<ResponseJson> {
    try {
      if (!Object.keys(data).length)
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          statusMessage: 'BAD REQUEST',
          message: 'Data is required',
        };
      const existPriceList = await this.priceListRepo.findById(id);
      if (!existPriceList || existPriceList.deleted_at) return response404();
      if (data.code) {
        const existCode = await this.priceListRepo.findByCode(data.code);
        if (existCode && existCode.id !== id)
          return response404('Code already exist');
      }
      if (data.model_id) {
        const vehicleModel = await this.vehicleModelRepo.findById(
          data.model_id,
        );
        if (!vehicleModel || vehicleModel.deleted_at)
          return response404('Vehicle model not found');
      }
      if (data.year_id) {
        const vehicleType = await this.vehicleYearRepo.findById(data.year_id);
        if (!vehicleType || vehicleType.deleted_at)
          return response404('Vehicle year not found');
      }

      const result = await this.priceListRepo.update(id, data);
      return response200({ data: result, message: 'Updated' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
  async delete(id: string): Promise<ResponseJson> {
    try {
      const existPriceList = await this.priceListRepo.findById(id);
      if (!existPriceList || existPriceList.deleted_at) return response404();
      await this.priceListRepo.delete(id);
      return response200({ message: 'Deleted' });
    } catch (error) {
      debugConsole(error);
      return response500();
    }
  }
}
