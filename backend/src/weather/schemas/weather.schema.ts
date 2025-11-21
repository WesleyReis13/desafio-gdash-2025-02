import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherDocument = Weather & Document;

@Schema({ timestamps: true })
export class Weather {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  humidity: number;

  @Prop({ required: true })
  windSpeed: number;

  @Prop({ required: true })
  condition: string;

  @Prop()
  description: string;

  @Prop()
  pressure: number;

  @Prop()
  visibility: number;

  @Prop()
  timestamp: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
