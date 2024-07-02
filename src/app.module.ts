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
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule, VehicleBrandModule, VehicleTypeModule, VehicleModelModule, VehicleYearModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerMiddleware)
      .exclude({ path: '/', method: RequestMethod.GET })
      .forRoutes('*');
  }
}
