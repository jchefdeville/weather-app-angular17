import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.css'
})
export class WeatherResultComponent implements OnChanges {

    town = input.required();

    weatherService = inject(WeatherService);

    ngOnChanges(changes: SimpleChanges): void {
      console.log(this.town());
    }
}
