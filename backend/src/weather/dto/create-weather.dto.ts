import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  city: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  windSpeed: number;

  @IsString()
  condition: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  pressure?: number;

  @IsNumber()
  @IsOptional()
  visibility?: number;

  @IsDate()
  @IsOptional()
  timestamp?: Date;
}