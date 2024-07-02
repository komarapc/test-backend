import { Test, TestingModule } from '@nestjs/testing';
import { VehicleYearService } from './vehicle-year.service';

describe('VehicleYearService', () => {
  let service: VehicleYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleYearService],
    }).compile();

    service = module.get<VehicleYearService>(VehicleYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
