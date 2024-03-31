import { Controller, Get, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WeatherFormattedResponseDto } from './dto/formatted-response.dto';
import { GetWeatherDto } from './dto/getWeather.dto';
import { ResponseFormattingInterceptor } from './formatting-interceptor';
import { WeatherApiData } from './weather-api.model';
import { WeatherApiService } from './weather-api.service';

@UseInterceptors(ResponseFormattingInterceptor)
@Controller('weather-api')
export class WeatherApiController {
  constructor(private weatherApiService: WeatherApiService) {}

  @ApiOperation({
    summary:
      'Get weather information based on latitude and longitude from api.openweathermap.org and store it in DB',
  })
  @ApiResponse({
    status: 201,
    description: 'Weather information retrieved and saved successfully',
    type: WeatherFormattedResponseDto,
  })
  @Post()
  getWeatherFromApi(@Query() query: GetWeatherDto): Promise<WeatherApiData> {
    return this.weatherApiService.getWeatherFromApi(query);
  }

  @ApiOperation({
    summary: 'Get weather information based on latitude and longitude from DB',
  })
  @ApiResponse({
    status: 200,
    description: 'Weather information got from DB successfully',
    type: WeatherFormattedResponseDto,
  })
  @Get()
  getWeatherFromDb(@Query() query: GetWeatherDto): Promise<WeatherApiData> {
    return this.weatherApiService.getWeatherFromDb(query);
  }
}
