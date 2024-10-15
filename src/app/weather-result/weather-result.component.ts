import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';

import { CityResult, WeatherData } from '../weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherForecastService } from '../weather-forecast.service';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    city = input.required<CityResult>();
    weatherData: WeatherData | undefined;

    weatherForecastService = inject(WeatherForecastService);

    ngOnChanges(changes: SimpleChanges): void {
      this.weatherForecastService.callWeatherForescastApi(this.city().latitude, this.city().longitude)
        .then((data: WeatherData) => {
          this.weatherData = data;
        })
        .catch((error) => {
          console.error('Erreur while calling WeatherForecast API:', error);
        });
    }
}
