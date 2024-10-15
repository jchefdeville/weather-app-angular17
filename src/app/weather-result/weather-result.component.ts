import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';

import { CityResult, WeatherData } from '../weather-data.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    city = input.required<CityResult>();
    weatherData = input.required<WeatherData>();

    ngOnChanges(changes: SimpleChanges): void {
      console.log("On change" + changes);
    }
}
