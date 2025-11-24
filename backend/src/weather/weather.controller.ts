import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './schemas/weather.schema';
import { CreateWeatherDto } from './dto/create-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async create(@Body() weatherData: Partial<Weather>): Promise<Weather> {
    return this.weatherService.create(weatherData);
  }

  @Post('collect')
  @UsePipes(new ValidationPipe({ transform: true }))
  async collectWeatherData(@Body() createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const weatherData = {
      ...createWeatherDto,
      timestamp: createWeatherDto.timestamp || new Date(),
    };
    return this.weatherService.create(weatherData);
  }

  @Get()
  async findAll(): Promise<Weather[]> {
    return this.weatherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Weather> {
    return this.weatherService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Weather>,
  ): Promise<Weather> {
    return this.weatherService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.weatherService.remove(id);
  }
}