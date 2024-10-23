import { Component, inject, input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { CityResult, WeatherData } from '../../model/weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherForecastService } from '../../service/weather-forecast.service';
import { WeatherInterpretationPipe } from '../../pipe/weather-interpretation.pipe';
import { HeaderWeatherResultComponent } from "./header-weather-result/header-weather-result.component";
import { CurrentWeatherResultComponent } from "./current-weather-result/current-weather-result.component";
import { HourlyWeatherResultComponent } from "./hourly-weather-result/hourly-weather-result.component";
import { CountdownWeatherResultComponent } from "./countdown-weather-result/countdown-weather-result.component";

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [DatePipe, WeatherInterpretationPipe, CommonModule, HeaderWeatherResultComponent, CurrentWeatherResultComponent, HourlyWeatherResultComponent, CountdownWeatherResultComponent],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    city = input.required<CityResult>();
    weatherData: WeatherData | undefined;

    weatherForecastService = inject(WeatherForecastService);

    ngOnChanges(changes: SimpleChanges): void {
      this.callWeatherForecastApi();
    }

    callWeatherForecastApi() {

      this.weatherForecastService.callWeatherForescastApi(this.city().latitude, this.city().longitude)
        .then((data: WeatherData) => {
          this.weatherData = data;
        })
        .catch((error) => {
          this.weatherData = undefined;
          console.error('Erreur while calling WeatherForecast API:', error);
        });
    }


}
