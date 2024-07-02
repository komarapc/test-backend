import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './api/auth/auth.module';
import { BearerMiddleware } from './middlewaree/bearer.middleware';
import { VehicleBrandModule } from './api/vehicle-brand/vehicle-brand.module';
import { VehicleTypeModule } from './api/vehicle-type/vehicle-type.module';
import { VehicleModelModule } from './api/vehicle-model/vehicle-model.module';
import { VehicleYearModule } from './api/vehicle-year/vehicle-year.module';
import { PriceListsModule } from './api/price-lists/price-lists.module';
import { AuthController } from './api/auth/auth.controller';
import { UsersController } from './api/users/users.controller';
import { PriceListsController } from './api/price-lists/price-lists.controller';
import { VehicleBrandController } from './api/vehicle-brand/vehicle-brand.controller';
import { VehicleModelController } from './api/vehicle-model/vehicle-model.controller';
import { VehicleTypeController } from './api/vehicle-type/vehicle-type.controller';
import { VehicleYearController } from './api/vehicle-year/vehicle-year.controller';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    VehicleBrandModule,
    VehicleTypeModule,
    VehicleModelModule,
    VehicleYearModule,
    PriceListsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerMiddleware)
      .exclude(
        { path: '/', method: RequestMethod.GET },
        { path: '/docs', method: RequestMethod.ALL },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes(
        UsersController,
        PriceListsController,
        VehicleBrandController,
        VehicleModelController,
        VehicleTypeController,
        VehicleYearController,
      );
  }
}
