import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';

import { CityResult, WeatherData } from '../../model/weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherForecastService } from '../../service/weather-forecast.service';
import { HeaderWeatherResultComponent } from "./header-weather-result/header-weather-result.component";
import { CurrentWeatherResultComponent } from "./current-weather-result/current-weather-result.component";
import { HourlyWeatherResultComponent } from "./hourly-weather-result/hourly-weather-result.component";
import { CountdownWeatherResultComponent } from "./countdown-weather-result/countdown-weather-result.component";
import { MinuteSecondsPipe } from '../../pipe/minute-seconds.pipe';
import { HourMinutesPipe } from '../../pipe/hour-minutes.pipe';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [DatePipe, MinuteSecondsPipe, HourMinutesPipe, CommonModule, HeaderWeatherResultComponent, CurrentWeatherResultComponent, HourlyWeatherResultComponent, CountdownWeatherResultComponent],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    city = input.required<CityResult>();
    weatherData: WeatherData | undefined;

    now: Date = new Date();

    selectedDay: Date = new Date();
    maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 4));

    weatherForecastService = inject(WeatherForecastService);

    ngOnChanges(changes: SimpleChanges): void {
      this.callWeatherForecastApi();
    }

    previousDay() {
      this.selectedDay.setDate(this.selectedDay.getDate() - 1);
      this.callWeatherForecastApi();
    }

    nextDay() {
      this.selectedDay.setDate(this.selectedDay.getDate() + 1);
      this.callWeatherForecastApi();
    }

    callWeatherForecastApi() {

      this.weatherForecastService.callWeatherForescastApi(this.city().latitude, this.city().longitude, this.selectedDay)
        .then((data: WeatherData) => {
          this.weatherData = data;
        })
        .catch((error) => {
          this.weatherData = undefined;
          console.error('Erreur while calling WeatherForecast API:', error);
        });
    }

    isPreviousDayDisabled(): boolean {
      return this.selectedDay <= this.now;
    }
  
    isNextDayDisabled(): boolean {
      return this.selectedDay >= this.maxDate;
    }

}
