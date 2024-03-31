import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Op } from 'sequelize';
import { GetWeatherDto } from './dto/getWeather.dto';
import { WeatherApiData } from './weather-api.model';

@Injectable()
export class WeatherApiService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(WeatherApiData)
    private weatherApiDataRepository: typeof WeatherApiData,
  ) {}

  async getWeatherFromApi(params: GetWeatherDto): Promise<WeatherApiData> {
    try {
      const { lat, lon, exclude } = params;
      const appID = process.env.APP_ID;
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${appID}`;
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            throw { 'openweathermap error': error.response.data };
          }),
        ),
      );
      const excludeArr = exclude?.length
        ? exclude.indexOf(',')
          ? exclude.split(',')
          : [exclude]
        : [];
      await this.weatherApiDataRepository.destroy({
        where: { lat, lon, part: { [Op.contains]: excludeArr } },
      }); // assuming that we store only the most fresh version of weather data for selected lon and lat in DB
      return await this.weatherApiDataRepository.create({
        data,
        part: excludeArr,
        lon,
        lat,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getWeatherFromDb(params: GetWeatherDto): Promise<WeatherApiData> {
    try {
      const { lat, lon, exclude } = params;
      const excludeArr = exclude?.length
        ? exclude.indexOf(',')
          ? exclude.split(',')
          : [exclude]
        : [];
      return await this.weatherApiDataRepository.findOne({
        where: { lat, lon, part: { [Op.contains]: excludeArr } },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
