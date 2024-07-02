import { Test, TestingModule } from '@nestjs/testing';
import { VehicleYearController } from './vehicle-year.controller';

describe('VehicleYearController', () => {
  let controller: VehicleYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleYearController],
    }).compile();

    controller = module.get<VehicleYearController>(VehicleYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
