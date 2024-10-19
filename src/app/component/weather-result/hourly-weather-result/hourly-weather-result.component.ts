import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { HourlyWeatherData } from '../../../model/weather-data.model';
import { CommonModule } from '@angular/common';
import { WeatherInterpretationPipe } from '../../../pipe/weather-interpretation.pipe';

@Component({
  selector: 'app-hourly-weather-result',
  standalone: true,
  imports: [CommonModule, WeatherInterpretationPipe],
  templateUrl: './hourly-weather-result.component.html',
  styleUrl: './hourly-weather-result.component.css'
})
export class HourlyWeatherResultComponent implements OnChanges {
  hourlyWeatherData = input.required<HourlyWeatherData>();
  
  now = new Date();

  ngOnChanges(changes: SimpleChanges): void {
      this.now = new Date();
  }

}
