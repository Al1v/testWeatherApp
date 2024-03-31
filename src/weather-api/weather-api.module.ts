import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WeatherApiController } from './weather-api.controller';
import { WeatherApiData } from './weather-api.model';
import { WeatherApiService } from './weather-api.service';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([WeatherApiData])],
  controllers: [WeatherApiController],
  providers: [WeatherApiService],
})
export class WeatherApiModule {}
