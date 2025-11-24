import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.weatherModel.find().sort({ timestamp: -1 }).exec();
  }

  
  async findOne(id: string): Promise<Weather> {
    const weather = await this.weatherModel.findById(id).exec();
    if (!weather) {
      throw new NotFoundException(`Weather data with ID ${id} not found`);
    }
    return weather;
  }

  
  async update(id: string, updateData: Partial<Weather>): Promise<Weather> {
    const updatedWeather = await this.weatherModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedWeather) {
      throw new NotFoundException(`Weather data with ID ${id} not found`);
    }
    return updatedWeather;
  }

  
  async remove(id: string): Promise<void> {
    const result = await this.weatherModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Weather data with ID ${id} not found`);
    }
  }
}