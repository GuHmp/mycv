import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2030)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsLatitude()
  lat: number;
}
