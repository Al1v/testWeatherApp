import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetWeatherDto {
  @ApiProperty({
    description: 'latitude',
    example: 50.4504,
  })
  @IsNotEmpty({ message: "The lat field can't be empty" })
  @Type(() => Number)
  @IsLatitude({ message: 'wrong latitude format' })
  readonly lat: Number;

  @ApiProperty({
    description: 'longitude',
    example: 30.5245,
  })
  @IsNotEmpty({ message: "The lon field can't be empty" })
  @Type(() => Number)
  @IsLongitude({ message: 'wrong longitude format' })
  readonly lon: Number;

  @ApiPropertyOptional({
    description: 'comma separated parts of response to exclude',
    example: 'hourly,daily',
  })
  @IsOptional()
  readonly exclude: string;
}
