import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weather, WeatherDocument } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name) private weatherModel: Model<WeatherDocument>,
  ) {}

  async create(weatherData: Partial<Weather>): Promise<Weather> {
    const createdWeather = new this.weatherModel(weatherData);
    return createdWeather.save();
  }

  async findAll(): Promise<Weather[]> {
    return this.weatherModel.find().exec();
  }
}