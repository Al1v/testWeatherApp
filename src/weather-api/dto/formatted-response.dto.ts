import { ApiProperty } from "@nestjs/swagger";

export class WeatherFormattedResponseDto {
  @ApiProperty()
  sunrise: number;
  @ApiProperty()
  sunset: number;
  @ApiProperty()
  temp: number;
  @ApiProperty()
  feels_like: number;
  @ApiProperty()
  pressure: number;
  @ApiProperty()
  humidity: number;
  @ApiProperty()
  uvi: number;
  @ApiProperty()
  wind_speed: number;

  constructor(data: any) {
    this.sunrise = data.data.current.sunrise;
    this.sunset = data.data.current.sunset;
    this.temp = data.data.current.temp;
    this.feels_like = data.data.current.feels_like;
    this.pressure = data.data.current.pressure;
    this.humidity = data.data.current.humidity;
    this.uvi = data.data.current.uvi;
    this.wind_speed = data.data.current.wind_speed;
  }
}