import { Component, inject, input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { CityResult, WeatherData } from '../weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherForecastService } from '../weather-forecast.service';
import { count, interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges, OnDestroy {

    city = input.required<CityResult>();
    weatherData: WeatherData | undefined;

    countdown = 900; // 15 minutes = 900 seconds
    timerSubscription!: Subscription;

    weatherForecastService = inject(WeatherForecastService);

    ngOnChanges(changes: SimpleChanges): void {
      this.callWeatherForecastApi();
    }

    ngOnDestroy(): void {
      this.unsubscribeTimer();
    }

    callWeatherForecastApi() {
      this.weatherForecastService.callWeatherForescastApi(this.city().latitude, this.city().longitude)
        .then((data: WeatherData) => {
          this.weatherData = data;

          this.startCountdown(this.weatherData.current.time);
        })
        .catch((error) => {
          this.weatherData = undefined;
          console.error('Erreur while calling WeatherForecast API:', error);
        });
    }

    updateCountdown(dateResultAPI: Date) {
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate.getTime() - dateResultAPI.getTime();
      
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      this.countdown = 900 - differenceInSeconds;
    }

    startCountdown(dateResultAPI: Date) {
      this.updateCountdown(dateResultAPI);

      this.unsubscribeTimer();

      this.timerSubscription = interval(1000)
        .pipe(take(this.countdown))
        .subscribe(() => {
          this.countdown--;
        });
    }

    unsubscribeTimer() {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
    }

}
